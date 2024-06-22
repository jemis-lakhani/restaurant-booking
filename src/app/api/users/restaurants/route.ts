import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Restaurant from "@/models/restaurantModel";

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, address, contactInfo, description } = reqBody;

    const newRestaurant = new Restaurant({
      name,
      address,
      contactInfo,
      description,
    });

    const savedRestaurant = await newRestaurant.save();

    return NextResponse.json(savedRestaurant, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id, name, address, contactInfo, description } = reqBody;

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      _id,
      {
        name,
        address,
        contactInfo,
        description,
      },
      { new: true }
    );

    if (!updatedRestaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRestaurant, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const restaurants = await Restaurant.find();
    return NextResponse.json(restaurants, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
