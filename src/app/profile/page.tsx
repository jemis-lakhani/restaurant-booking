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

const Profile = () => {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
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

    getUserDetails();

    setRole(localStorage.getItem("role"));
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      localStorage.removeItem("role");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex justify-between w-full p-4">
        <h1 className="text-2xl font-semibold mt-4">Profile Page</h1>
        <button
          onClick={logout}
          className="text-white rounded bg-green-700 mt-2 p-2"
        >
          Logout
        </button>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg mt-4 shadow-md">
        {data ? (
          <>
            <Link href={`/profile/${data._id}`}>
              <p className="text-xl font-semibold">Welcome, {data.username}!</p>
              <p className="text-lg text-gray-600">{data.email}</p>
              <p className="text-sm text-gray-500">Role: {role}</p>
            </Link>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>

      {role === "admin" && (
        <div className="mt-4">
          <Link href="/admin" className="text-blue-500 underline">
            Go to Admin Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
