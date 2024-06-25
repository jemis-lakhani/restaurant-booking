import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type TableProps = {
  table: {
    _id: string;
    tableNumber: number;
    capacity: number;
    startTime: string;
    endTime: string;
    restaurantId: string;
    bookings?: Booking[];
  };
};

type Booking = {
  startTime: string;
  endTime: string;
  userId: string;
};

const TableCard: React.FC<TableProps> = ({ table }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [booked, setBooked] = useState(false);

  const bookTable = async () => {
    try {
      await axios.post("/api/users/bookTable", {
        tableId: table._id,
        startTime,
        endTime,
      });
      toast.success("Table booked successfully");
      setBooked(true);
    } catch (error: any) {
      console.error("Error booking table:", error.message);
      toast.error("Failed to book table");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold">Table {table.tableNumber}</h3>
      <p>Capacity: {table.capacity}</p>
      <h4 className="font-bold mt-2">Bookings:</h4>
      {table.bookings && table.bookings.length > 0 ? (
        table.bookings.map((booking, index) => (
          <div key={index} className="mt-1">
            <p>Start Time: {new Date(booking.startTime).toLocaleString()}</p>
            <p>End Time: {new Date(booking.endTime).toLocaleString()}</p>
            <p>User ID: {booking.userId}</p>
          </div>
        ))
      ) : (
        <p>No bookings available</p>
      )}
      {!booked && (
        <div className="mt-4">
          <input
            type="datetime-local"
            className="input-field mb-2"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="datetime-local"
            className="input-field mb-2"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <button
            onClick={bookTable}
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-600"
          >
            Book Table
          </button>
        </div>
      )}
    </div>
  );
};

export default TableCard;
