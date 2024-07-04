"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Restaurant {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
  openTime: string;
  closeTime: string;
}

interface Table {
  _id: string;
  tableNumber: number;
  capacity: number;
  restaurantId: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const Admin = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantsRes = await axios.get("/api/users/restaurants");
        setRestaurants(restaurantsRes.data);

        const tablesRes = await axios.get("/api/users/tables");
        setTables(tablesRes.data);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4">
        <Link className="text-purple-600" href="/profile">
          Go to Profile
        </Link>
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
        <div className="bg-white shadow-md rounded-lg p-4 mb-8">
          {restaurants.map((restaurant) => (
            <div key={restaurant._id} className="mb-4">
              <h3 className="text-lg font-semibold">{restaurant.name}</h3>
              <p>Address: {restaurant.address}</p>
              <p>Contact: {restaurant.contactInfo}</p>
              <p>Description: {restaurant.description}</p>
              <p>Open Time: {restaurant.openTime}</p>
              <p>Close Time: {restaurant.closeTime}</p>
              <h4 className="mt-2 font-semibold">Tables:</h4>
              <ul>
                {tables
                  .filter((table) => table.restaurantId === restaurant._id)
                  .map((table) => (
                    <li key={table._id}>
                      Table {table.tableNumber}: Capacity {table.capacity}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          {users.map((user) => (
            <div key={user._id} className="mb-4">
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
