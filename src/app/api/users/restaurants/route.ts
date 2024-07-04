import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/dbConfig/dbConfig";
import Restaurant from "@/models/restaurantModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConfig();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const reqBody = await request.json();
    const { name, address, contactInfo, description, openTime, closeTime } = reqBody;

    const existingRestaurant = await Restaurant.findOne({ ownerId: userId });
    if (existingRestaurant) {
      return NextResponse.json(
        { error: "Owner already has a restaurant" },
        { status: 400 }
      );
    }

    const newRestaurant = new Restaurant({
      name,
      address,
      contactInfo,
      description,
      ownerId: userId,
      openTime,
      closeTime,
    });

    const savedRestaurant = await newRestaurant.save();
    return NextResponse.json(savedRestaurant, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const reqBody = await request.json();
    const { _id, name, address, contactInfo, description, openTime, closeTime } = reqBody;

    const restaurant = await Restaurant.findById(_id);
    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    }
    if (restaurant.ownerId.toString() !== userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    restaurant.name = name;
    restaurant.address = address;
    restaurant.contactInfo = contactInfo;
    restaurant.description = description;
    restaurant.openTime = openTime;
    restaurant.closeTime = closeTime;

    const updatedRestaurant = await restaurant.save();
    return NextResponse.json(updatedRestaurant, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const role = request.headers.get("x-role") || "";
    const userId = await getDataFromToken(request);

    let restaurants;
    if (role === "restaurantOwner") {
      restaurants = await Restaurant.find({ ownerId: userId });
    }  else if (role === "admin") {
      restaurants = await Restaurant.find();
    } else {
      restaurants = await Restaurant.find();
    }

    return NextResponse.json(restaurants, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
