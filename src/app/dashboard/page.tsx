"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddRestaurantForm from "../../Components/AddRestaurantForm";
import ManageTablesForm from "@/Components/ManageTablesForm";

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
};

const Dashboard: React.FC = () => {
  const [initialRestaurantData, setInitialRestaurantData] = useState<
    Restaurant[] | null
  >(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get("/api/users/restaurants");
        setInitialRestaurantData(response.data);
      } catch (error: any) {
        console.error("Error fetching initial restaurant data:", error.message);
        toast.error("Failed to fetch initial restaurant data");
      }
    };

    fetchInitialData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Restaurant Owner Dashboard</h1>
      <div className="mt-4"></div>
      <div className="flex">
        <div className="mt-4 mr-4">
          {initialRestaurantData !== null && (
            <AddRestaurantForm
              onSubmit={(data) => {}}
            />
          )}
        </div>
        <div className="mt-4">
          <ManageTablesForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
