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

function Profile() {
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfully");
      localStorage.removeItem("role");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <div className="flex justify-between w-full px-36">
        <h1 className="text-2xl font-semibold mt-4">Profile Page</h1>
        <button
          onClick={logout}
          className="text-white rounded bg-green-700 mt-2 p-2"
        >
          Logout
        </button>
      </div>

      <button
        onClick={getUserDetails}
        className="text-white rounded bg-purple-600 mt-2 p-1"
      >
        My Details
      </button>

      <h2 className="p-1 mt-2  bg-black text-white">
        {data === null ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data._id}`}>
            Username : {data.username}
            <br />
            Email : {data.email}
            <br />
            Role: {role}
          </Link>
        )}
      </h2>
      {role === "admin" && (
        <div className="mt-4">
          <Link href="/admin">Go to Admin Dashboard</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
