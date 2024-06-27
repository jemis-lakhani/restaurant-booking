"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TableCard from "@/components/TableCard";
import { useParams } from "next/navigation";

type Table = {
  _id: string;
  tableNumber: number;
  capacity: number;
  startTime: string;
  endTime: string;
  restaurantId: string;
};

const TableBookingPage: React.FC = () => {
  const { restaurantId } = useParams();
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof restaurantId === "string") {
      fetchTables(restaurantId);
    }
  }, [restaurantId]);

  const fetchTables = async (restaurantId: string) => {
    try {
      const response = await axios.get(
        `/api/users/tables?restaurantId=${restaurantId}`
      );
      setTables(response.data);
    } catch (error: any) {
      console.error("Error fetching tables:", error.message);
      toast.error("Failed to fetch tables");
    } finally {
      setLoading(false);
    }
  };

  if (!restaurantId) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" sm:px-8">
      <h1 className="text-2xl font-semibold mt-6 ml-3">Tables Details</h1>
      <div className="py-8 ml-4">
        {loading ? (
          <div>Loading...</div>
        ) : tables.length === 0 ? (
          <div>No tables found for this restaurant.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tables.map((table) => (
              <div key={table._id}>
                <TableCard table={table} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableBookingPage;
