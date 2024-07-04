import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Table from "@/models/tableModel";
import Restaurant from "@/models/restaurantModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { tableNumber, capacity, restaurantId } = reqBody;

    const existingTable = await Table.findOne({ tableNumber, restaurantId });
    if (existingTable) {
      return NextResponse.json(
        { error: "Table number already exists for this restaurant" },
        { status: 400 }
      );
    }
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }
    const newTable = new Table({
      tableNumber,
      capacity,
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
    const { role } = await getDataFromToken(request);
    const query = restaurantId ? { restaurantId } : {};

    const tables = await Table.find(query);
    const populatedTables = await Promise.all(
      tables.map(async (table) => {
        const restaurant = await Restaurant.findById(table.restaurantId);
        return {
          ...table.toJSON(),
          restaurantName: restaurant ? restaurant.name : "Unknown Restaurant",
          restaurantAddress: restaurant
            ? restaurant.address
            : "Unknown Address",
        };
      })
    );
    if (role === 'admin') {
      // Admin-specific logic
      return NextResponse.json(populatedTables, { status: 200 });
    }
    return NextResponse.json(populatedTables, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id, tableNumber, capacity, restaurantId } = reqBody;

    const updatedTable = await Table.findByIdAndUpdate(
      _id,
      { tableNumber, capacity, restaurantId },
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
