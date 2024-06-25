// /api/users/bookTable.ts
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Table from "@/models/tableModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request); // Retrieve user ID from token
    const reqBody = await request.json();
    const { tableId, startTime, endTime } = reqBody;

    const table = await Table.findById(tableId);

    if (!table) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    // Ensure table.bookings is initialized and an array
    table.bookings = table.bookings || [];

    // Check if there's an overlapping booking for the same table and time
    const overlappingBooking = table.bookings.some((booking:any) =>
      (new Date(startTime) < new Date(booking.endTime)) && (new Date(endTime) > new Date(booking.startTime))
    );

    if (overlappingBooking) {
      return NextResponse.json({ error: "Time slot is already booked" }, { status: 400 });
    }

    // Add the booking
    table.bookings.push({ startTime, endTime, userId });
    await table.save();

    return NextResponse.json(table, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
