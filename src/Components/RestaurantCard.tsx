import Image from "next/image";
import React from "react";

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
};

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white hover:shadow-2xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image alt="logo" src="/Logo.png" layout="fill" objectFit="cover" className="rounded-t-lg" />
      </div>
      <div className="px-6 py-4 bg-green-50">
        <h3 className="font-bold text-xl mb-2">{restaurant.name}</h3>
        <p className="text-gray-700 text-base">
          <strong>Address:</strong> {restaurant.address}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Contact:</strong> {restaurant.contactInfo}
        </p>
        <p className="text-gray-700 text-base mt-2">
          {restaurant.description}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
