"use client";
import React from "react";
import Link from "next/link";
import AddRestaurantForm from "../../Components/AddRestaurantForm";
import ManageTablesForm from "@/Components/ManageTablesForm";
const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Restaurant Owner Dashboard</h1>
      <div className="mt-4">
      </div>
      <div className="flex">
      <div className="mt-4 mr-4">
      <AddRestaurantForm/>
      </div>
      <div className="mt-4">
     <ManageTablesForm/>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
