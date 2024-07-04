"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddRestaurantForm from "@/components/AddRestaurantForm";
import ManageTablesForm from "@/components/ManageTablesForm";
import TableCard from "@/components/TableCard";
import Image from "next/image";

type Restaurant = {
  _id: string;
  name: string;
  address: string;
  contactInfo: string;
  description: string;
  ownerId: string;
  openTime: string;
  closeTime: string;
};

type Table = {
  _id: string;
  tableNumber: number;
  capacity: number;
  restaurantId: string;
  startTime: string;
  endTime: string;
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
      setTables(response.data.reverse());
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

  const updateRestaurant = (data: Restaurant) => {
    setRestaurants(
      restaurants.map((restaurant) =>
        restaurant._id === data._id ? data : restaurant
      )
    );
  };

  return (
    <div className="flex min-h-screen py-4 mx-4 sm:flex-row md:flex-row lg:flex-col">
      <div className="fixed left-4 sm:flex-row md:flex-row lg:flex-col">
        {restaurants.length > 0 ? (
          <AddRestaurantForm
            restaurant={restaurants[0]}
            onSubmit={updateRestaurant}
          />
        ) : (
          <AddRestaurantForm onSubmit={updateRestaurant} />
        )}
      </div>

      <div className="ml-80 pl-8">
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row">
          <div>
            <h1 className="text-2xl font-medium mb-4">
              Restaurant Owner Dashboard
            </h1>

            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <div key={restaurant._id} className="mb-8">
                  <div className="max-w-fit rounded overflow-hidden shadow-lg m-4 bg-white hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative h-52">
                      <Image
                        alt="logo"
                        src="/Logo.png"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="px-6 py-4 bg-gray-100">
                      <h3 className="font-bold text-xl mb-2">
                        Name: {restaurant.name}
                      </h3>
                      <p className="text-gray-700 text-base">
                        <strong>Restaurant ID:</strong> {restaurant._id}
                      </p>
                      <p className="text-gray-700 text-base">
                        <strong>Owner Id:</strong> {restaurant.ownerId}
                      </p>
                      <p className="text-gray-700 text-base">
                        <strong>Address:</strong> {restaurant.address}
                      </p>
                      <p className="text-gray-700 text-base">
                        <strong>ContactInfo:</strong> {restaurant.contactInfo}
                      </p>
                      <p className="text-gray-700 text-base">
                        <strong>Open Time:</strong> {restaurant.openTime}
                      </p>
                      <p className="text-gray-700 text-base">
                        <strong>Close Time:</strong> {restaurant.closeTime}
                      </p>
                      <p className="text-gray-700 text-base">
                        <strong>Description:</strong> {restaurant.description}
                      </p>
                      <button
                        onClick={() => handleRestaurantClick(restaurant._id)}
                        className="text-white rounded bg-green-700 mt-2 p-2"
                      >
                        {selectedRestaurantId === restaurant._id && showTables
                          ? "Hide Tables"
                          : "Manage Tables"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No restaurants added yet.</p>
            )}
          </div>
          <div>
            <div className="mt-12 ml-4">
              {showTables && selectedRestaurantId && (
                <ManageTablesForm
                  restaurantId={selectedRestaurantId}
                  onTableAdded={() => fetchTables(selectedRestaurantId)}
                />
              )}
            </div>
          </div>
        </div>
        {showTables && selectedRestaurantId && (
          <div className="mt-8">
            <h2>Tables for Restaurant ID: {selectedRestaurantId}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
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
      </div>
    </div>
  );
};

export default Dashboard;
