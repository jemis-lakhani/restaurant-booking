"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserData = {
  _id: string;
  username: string;
  email: string;
};

type TableBooking = {
  tableId: string;
  restaurantId: string;
  startTime: string;
  endTime: string;
  restaurantName: string;
  restaurantAddress: string;
};

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [bookings, setBookings] = useState<TableBooking[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setData(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch user details");
        console.error(error);
      }
    };

    const getUserBookings = async () => {
      try {
        const res = await axios.get("/api/users/tables");
        setBookings(res.data);
      } catch (error) {
        toast.error("Failed to fetch table bookings");
        console.error(error);
      }
    };

    getUserDetails();
    getUserBookings();

    setRole(localStorage.getItem("role"));
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
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

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex justify-between w-full p-2 px-4">
        <h1 className="text-2xl font-semibold mt-4">Profile Page</h1>
        <div className="p-4 bg-gray-100 rounded-lg mt-4 shadow-md">
          {data ? (
            <>
              <Link href={`/profile/${data.username}`}>
                <p className="text-xl font-semibold">
                  Welcome, {data.username}!
                </p>
                <p className="text-lg text-gray-600">{data.email}</p>
              </Link>
            </>
          ) : (
            <p>Loading user details...</p>
          )}
        </div>
        <button
          onClick={logout}
          className="text-white rounded bg-green-700 mt-2 p-2 h-fit"
        >
          Logout
        </button>
      </div>

      {role === "user" && (
        <div className="mt-8 w-full max-w-4xl ">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Your Table Bookings
          </h2>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.tableId}
                className="mb-4 p-4 bg-gray-50 shadow-md rounded-lg border-l-4 border-green-500 "
              >
                <p className="text-lg font-semibold text-gray-800">
                  Restaurant: {booking.restaurantName}
                </p>
                <p className="text-gray-600">
                  Address: {booking.restaurantAddress}
                </p>
                <p className="text-gray-600">
                  From: {new Date(booking.startTime).toLocaleString()} -
                  To: {new Date(booking.endTime).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-800">No table bookings found.</p>
          )}
        </div>
      )}

      {role === "admin" && (
        <div className="mt-4 ml-16">
          <Link href="/admin" className="text-blue-500 underline">
            Go to Admin Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
