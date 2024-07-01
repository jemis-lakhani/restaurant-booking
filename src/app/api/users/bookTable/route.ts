import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Table from "@/models/tableModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const reqBody = await request.json();
    const { tableId, startTime, endTime } = reqBody;

    const table = await Table.findById(tableId);
    const user = await User.findById(userId);

    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    table.bookings = table.bookings || [];

    const overlappingBooking = table.bookings.some(
      (booking: any) =>
        new Date(startTime) < new Date(booking.endTime) &&
        new Date(endTime) > new Date(booking.startTime)
    );

    if (overlappingBooking) {
      return NextResponse.json(
        { error: "Time slot is already booked" },
        { status: 400 }
      );
    }

    table.bookings.push({ startTime, endTime, userId,username: user.username, email: user.email, });
    await table.save();

    return NextResponse.json(table, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const role = localStorage.getItem("role");
    if (role !== "user") {
      return NextResponse.json([], { status: 200 });
    }

    const tables = await Table.find({ "bookings.userId": userId });

    if (!tables) {
      return NextResponse.json({ error: "No tables found" }, { status: 404 });
    }

    const userTables = tables.map((table) => {
      return {
        ...table.toObject(),
        bookings: table.bookings.filter((booking: any) => booking.userId === userId),
      };
    });

    return NextResponse.json(userTables, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}