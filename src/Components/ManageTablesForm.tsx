"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

type Table = {
  tableNumber: number;
  capacity: number;
  startTime: string;
  endTime: string;
  restaurantId: string;
};

const ManageTablesForm: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Table>();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("/api/users/tables");
        setTables(response.data);
      } catch (error: any) {
        console.error("Error fetching tables:", error.message);
        toast.error("Failed to fetch tables");
      }
    };

    fetchTables();
  }, []);

  const onSubmit: SubmitHandler<Table> = async (data) => {
    try {
      let response;
      response = await axios.post(`/api/users/tables`, data);
      toast.success("Table added successfully");
      reset();
      setTables((prev) => [...prev, response.data]);
    } catch (error: any) {
      console.error("Error adding/updating table:", error.message);
      toast.error("Failed to add/update table");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Manage Tables</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="restaurantId" className="block text-gray-700 mb-1">
            Restaurant ID
          </label>
          <input
            type="text"
            id="restaurantId"
            {...register("restaurantId", { required: true })}
            className="input-field"
            placeholder="Enter restaurant ID"
          />
          {errors.restaurantId && (
            <p className="text-red-500">Restaurant ID is required</p>
          )}
        </div>
        <div>
          <label htmlFor="tableNumber" className="block text-gray-700 mb-1">
            Table Number
          </label>
          <input
            type="number"
            id="tableNumber"
            {...register("tableNumber", { required: true })}
            className="input-field"
            placeholder="Enter table number"
          />
          {errors.tableNumber && (
            <p className="text-red-500">Table Number is required</p>
          )}
        </div>
        <div>
          <label htmlFor="capacity" className="block text-gray-700 mb-1">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            {...register("capacity", { required: true })}
            className="input-field"
            placeholder="Enter capacity"
          />
          {errors.capacity && (
            <p className="text-red-500">Capacity is required</p>
          )}
        </div>
        <div>
          <label htmlFor="startTime" className="block text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="datetime-local"
            id="startTime"
            {...register("startTime", { required: "Start Time is required" })}
            className="input-field"
          />
          {errors.startTime && (
            <p className="text-red-500">{errors.startTime.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="endTime" className="block text-gray-700 mb-1">
            End Time
          </label>
          <input
            type="datetime-local"
            id="endTime"
            {...register("endTime", { required: "End Time is required" })}
            className="input-field"
          />
          {errors.endTime && (
            <p className="text-red-500">{errors.endTime.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Add Table
        </button>
      </form>
    </div>
  );
};

export default ManageTablesForm;
