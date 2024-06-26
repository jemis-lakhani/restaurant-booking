"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RestaurantCard from "@/components/RestaurantCard";
import TableCard from "@/components/TableCard";

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
};

type Table = {
  _id: string;
  tableNumber: number;
  capacity: number;
  startTime: string;
  endTime: string;
  restaurantId: string;
};

type Booking = {
  startTime: string;
  endTime: string;
  userId: string;
};

function HomePage() {
  const [role, setRole] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    } else {
      console.error("Role not found in local storage");
    }
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("/api/users/restaurants");
        setRestaurants(response.data);
      } catch (error: any) {
        console.error("Error fetching restaurants:", error.message);
        toast.error("Failed to fetch restaurants");
      }
    };

    fetchRestaurants();
  }, []);

  const fetchTables = async (restaurantId: string) => {
    try {
      const response = await axios.get(
        `/api/users/tables?restaurantId=${restaurantId}`
      );
      setTables(response.data);
    } catch (error: any) {
      console.error("Error fetching tables:", error.message);
      toast.error("Failed to fetch tables");
    }
  };

  const handleRestaurantClick = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    fetchTables(restaurantId);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfully");
      localStorage.removeItem("role");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-4">
      <div className="flex justify-between w-full px-36">
        <h1 className="text-2xl font-semibold mt-4">Home Page</h1>
        <button
          onClick={logout}
          className="text-white rounded bg-green-700 mt-2 p-2"
        >
          Logout
        </button>
      </div>
      {role === "user" && (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 px-16">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  onClick={() => handleRestaurantClick(restaurant._id)}
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
              {tables.map((table) => (
                <div key={table._id} className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
                  <TableCard table={table} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {role === "restaurantOwner" && (
        <div className="mt-4">
          <h2>Welcome, Restaurant Owner!</h2>
          <p>Content for restaurant owners...</p>
          <Link className="text-purple-600" href="/dashboard">
            Go to Dashboard
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="mt-4">
          <h2>Welcome, Admin!</h2>
          <p>Content for admins...</p>
          <Link className="text-purple-600" href="/admin">Go to Admin Dashboard</Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
