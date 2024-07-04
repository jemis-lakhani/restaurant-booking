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
  openTime: string;
  closeTime: string;
};

type UserData = {
  username: string;
};

function HomePage() {
  const [role, setRole] = useState<string | null>(null);
  const [data, setData] = useState<UserData | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
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
    if (role === "user") {
      const fetchRestaurants = async () => {
        try {
          const response = await axios.get("/api/users/restaurants");
          setRestaurants(response.data);
          setFilteredRestaurants(response.data);
        } catch (error: any) {
          console.error("Error fetching restaurants:", error.message);
          toast.error("Failed to fetch restaurants");
        }
      };

      fetchRestaurants();
    }
  }, [role]);

  const handleRestaurantClick = (restaurantId: string) => {
    router.push(`/tablebook/${restaurantId}`);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfully");
      localStorage.removeItem("role");
      router.push("/login");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filterRestaurants = () => {
      const filtered = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    };

    filterRestaurants();
  }, [searchTerm, restaurants]);

  return (
    <div className="flex flex-col items-center min-h-screen ">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 w-full">
        <h1 className="text-2xl font-semibold mt-4 sm:mt-0">
          Welcome, {data?.username}!
        </h1>
        {role === "user" && (
          <form className="mt-4 sm:mt-0">
            <input
              type="text"
              onChange={handleSearch}
              value={searchTerm}
              placeholder="Search by name or address"
              className="px-2 py-1 rounded-md border-gray-600 border focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </form>
        )}
        <button
          onClick={logout}
          className="text-white rounded bg-green-700 mt-2 sm:mt-0 ml-0 sm:ml-4 p-2"
        >
          Logout
        </button>
      </div>

      {role === "user" && (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="flex flex-col gap-6">
              {filteredRestaurants.map((restaurant) => (
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
