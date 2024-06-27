"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RestaurantCard from "@/components/RestaurantCard";

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
};

type UserData = {
  username: string;
};

function HomePage() {
  const [role, setRole] = useState<string | null>(null);
  const [data, setData] = useState<UserData | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    } else {
      console.error("Role not found in local storage");
    }

    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setData(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch user details");
        console.error(error);
      }
    };

    getUserDetails();
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

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/tablebook/${restaurantId}`);
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
    <div className="flex flex-col items-center min-h-screen ">
      <div className="flex justify-between items-center w-full p-4">
        <h1 className="text-2xl font-semibold mt-4">
          Welcome, {data?.username}!
        </h1>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant._id}
                  className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  onClick={() => handleRestaurantClick(restaurant._id)}
                >
                  <RestaurantCard restaurant={restaurant} />
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
          <Link className="text-purple-600" href="/admin">
            Go to Admin Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
