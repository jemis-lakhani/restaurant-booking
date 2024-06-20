import { NextRequest, NextResponse } from 'next/server';
import dbConfig from '@/dbConfig/dbConfig';
import Table from '@/models/tableModel';

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      tableNumber,
      capacity,
      startTime,
      endTime,
      restaurantId
    } = reqBody;

    const newTable = new Table({
      tableNumber,
      capacity,
      startTime,
      endTime,
      restaurantId
    });

    const savedTable = await newTable.save();

    return NextResponse.json(savedTable, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
