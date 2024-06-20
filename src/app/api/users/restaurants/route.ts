import { NextRequest, NextResponse } from 'next/server';
import dbConfig from '@/dbConfig/dbConfig';
import Restaurant from '@/models/restaurantModel';

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      name,
      address,
      contactInfo,
      description,
    } = reqBody;

    const newRestaurant = new Restaurant({ name, address, contactInfo, description });
    console.log({ newRestaurant });

    const savedRestaurant = await newRestaurant.save();

    return NextResponse.json(savedRestaurant, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

