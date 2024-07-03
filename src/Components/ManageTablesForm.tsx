"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

type Table = {
  tableNumber: number;
  capacity: number;
  restaurantId: string;
  startTime: string;
  endTime: string;
};

type ManageTablesFormProps = {
  restaurantId: string;
  onTableAdded: () => void;
};
const ManageTablesForm: React.FC<ManageTablesFormProps> = ({
  restaurantId,
  onTableAdded,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Table>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Table> = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/users/tables`, {
        ...data,
        restaurantId,
      });
      toast.success("Table added successfully");
      reset();
      onTableAdded();
    } catch (error: any) {
      console.error("Error adding table:", error.message);
      toast.error(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-fit bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-semibold mb-4">Add Tables</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding Table..." : "Add Table"}
        </button>
      </form>
    </div>
  );
};

export default ManageTablesForm;
