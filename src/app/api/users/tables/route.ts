import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Table from "@/models/tableModel";

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { tableNumber, capacity, startTime, endTime, restaurantId } = reqBody;

    const existingTable = await Table.findOne({ tableNumber, restaurantId });
    if (existingTable) {
      return NextResponse.json(
        { error: "Table number already exists for this restaurant" },
        { status: 400 }
      );
    }

    const newTable = new Table({
      tableNumber,
      capacity,
      startTime,
      endTime,
      restaurantId,
    });
    const savedTable = await newTable.save();

    return NextResponse.json(savedTable, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("restaurantId");

    const query = restaurantId ? { restaurantId } : {};

    const tables = await Table.find(query);
    return NextResponse.json(tables, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id, tableNumber, capacity, startTime, endTime, restaurantId } =
      reqBody;

    const updatedTable = await Table.findByIdAndUpdate(
      _id,
      { tableNumber, capacity, startTime, endTime, restaurantId },
      { new: true }
    );

    if (!updatedTable) {
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTable, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
