"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddRestaurantForm from "@/components/AddRestaurantForm";
import ManageTablesForm from "@/components/ManageTablesForm";
import TableCard from "@/components/TableCard";

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
  ownerId: string;
};
type Table = {
  _id: string;
  tableNumber: number;
  capacity: number;
  startTime: string;
  endTime: string;
  restaurantId: string;
};

const Dashboard: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    string | null
  >(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [showTables, setShowTables] = useState<boolean>(false);

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
              "x-role": role,
            },
          });
          setRestaurants(response.data);
        } catch (error: any) {
          toast.error("Failed to fetch restaurants");
        }
      };

      fetchRestaurants();
    }
  }, [role]);

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
    if (selectedRestaurantId === restaurantId && showTables) {
      setShowTables(false);
    } else {
      setSelectedRestaurantId(restaurantId);
      fetchTables(restaurantId);
      setShowTables(true);
    }
  };
  const addRestaurant = (data: Restaurant) => {
    setRestaurants([...restaurants, data]);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-2 mx-32">
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
              <button
                onClick={() => handleRestaurantClick(restaurant._id)}
                className="text-white rounded bg-green-700 mt-2 p-2"
              >
                {selectedRestaurantId === restaurant._id && showTables
                  ? "Hide Tables"
                  : "Manage Tables"}
              </button>
            </div>
          ))
        ) : (
          <p>No restaurants added yet.</p>
        )}
      </div>
      {showTables && selectedRestaurantId && (
        <div className="mt-4">
          <h2>Tables for Restaurant ID: {selectedRestaurantId}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {tables.length > 0 ? (
              tables.map((table) => (
                <div key={table._id}>
                  <TableCard table={table} />
                </div>
              ))
            ) : (
              <p>No tables found for this restaurant.</p>
            )}
          </div>
        </div>
      )}
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
