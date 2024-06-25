"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddRestaurantForm from "@/components/AddRestaurantForm";
import ManageTablesForm from "@/components/ManageTablesForm";

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
  ownerId: string;
};

const Dashboard: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (role) {
      const fetchRestaurants = async () => {
        try {
          const response = await axios.get("/api/users/restaurants", {
            headers: {
              'x-role': role,
            },
          });
          setRestaurants(response.data);
        } catch (error:any) {
          toast.error("Failed to fetch restaurants");
        }
      };

      fetchRestaurants();
    }
  }, [role]);

  const addRestaurant = (data: Restaurant) => {
    setRestaurants([...restaurants, data]);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Restaurant Owner Dashboard</h1>
      <div className="mt-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant._id} className="mb-4">
              <h2 className="font-semibold text-xl">Name: {restaurant.name}</h2>
              <h2>Restaurant ID: {restaurant._id}</h2>
              <h1>Owner Id: {restaurant.ownerId}</h1>
              <p>Address: {restaurant.address}</p>
              <p>ContactInfo: {restaurant.contactInfo}</p>
              <p>Description: {restaurant.description}</p>
            </div>
          ))
        ) : (
          <p>No restaurants added yet.</p>
        )}
      </div>
      <div className="flex">
        <div className="mt-4 mr-4">
          <AddRestaurantForm onSubmit={addRestaurant} />
        </div>
        <div className="mt-4">
          <ManageTablesForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
