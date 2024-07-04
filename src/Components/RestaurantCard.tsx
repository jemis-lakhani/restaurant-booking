import Image from "next/image";
import React from "react";

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
  openTime: string;
  closeTime: string;
};

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  return (
    <div className="flex flex-row max-w-full rounded-lg overflow-hidden shadow-lg m-4 bg-white hover:shadow-2xl transition-shadow ">
      <div className="relative w-1/4 h-48">
        <Image
          alt="logo"
          src="/Logo.png"
          layout="fill"
          objectFit="cover"
          className="rounded-l-lg"
        />
      </div>
      <div className="w-3/4 px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200">
        <h3 className="font-bold text-2xl mb-2 text-gray-900">
          {restaurant.name}
        </h3>
        <p className="text-gray-700 text-lg">
          <strong>Address:</strong> {restaurant.address}
        </p>
        <p className="text-gray-700 text-lg">
          <strong>Contact:</strong> {restaurant.contactInfo}
        </p>
        <p className="text-gray-700 text-lg mt-2">{restaurant.description}</p>
      </div>
      <div className="min-w-fit px-4 pt-14 bg-gradient-to-r bg-gray-200">
        <p className="text-gray-700 text-lg"> openTime: {restaurant.openTime}</p>
        <p className="text-gray-700 text-lg">closeTime: {restaurant.closeTime}</p>
        </div>
    </div>
  );
};
export default RestaurantCard;
