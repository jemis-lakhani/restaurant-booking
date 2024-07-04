import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Table from "@/models/tableModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Restaurant from "@/models/restaurantModel";

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const reqBody = await request.json();
    const { tableId, startTime, endTime } = reqBody;

    const table = await Table.findById(tableId);
    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    const restaurant = await Restaurant.findById(table.restaurantId);
    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);
    const openTime = new Date(`1970-01-01T${restaurant.openTime}`);
    const closeTime = new Date(`1970-01-01T${restaurant.closeTime}`);

    if (
      startDateTime.getHours() < openTime.getHours() ||
      endDateTime.getHours() > closeTime.getHours()
    ) {
      return NextResponse.json(
        {
          error: `Booking times must be within the restaurant's open hours (${restaurant.openTime} - ${restaurant.closeTime}).`,
        },
        { status: 400 }
      );
    }

    table.bookings = table.bookings || [];

    const bookingExists = table.bookings.some(
      (booking: any) =>
        (new Date(startTime) >= new Date(booking.startTime) &&
          new Date(startTime) < new Date(booking.endTime)) ||
        (new Date(endTime) > new Date(booking.startTime) &&
          new Date(endTime) <= new Date(booking.endTime))
    );

    if (bookingExists) {
      return NextResponse.json(
        { error: "The slot is already booked." },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    const newBooking = {
      userId,
      startTime,
      endTime,
      username: user.username,
      email: user.email,
    };

    table.bookings.push(newBooking);

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
        bookings: table.bookings.filter(
          (booking: any) => booking.userId === userId
        ),
      };
    });

    return NextResponse.json(userTables, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
