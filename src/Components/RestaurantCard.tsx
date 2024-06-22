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
    <div>
      <div className="card m-2 h-auto w-52 shadow-lg">
        <Image alt="logo" src="/Logo.png" width={200} height={200} />
        <div className=" bg-green-50">
          <h3 className="font-bold text-xl">{restaurant.name}</h3>
          <h5>{restaurant.address}</h5>
          <h5>{restaurant.contactInfo}</h5>
          <p>{restaurant.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
