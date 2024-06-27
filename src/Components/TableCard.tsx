import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type TableProps = {
  table: {
    _id: string;
    tableNumber: number;
    capacity: number;
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
  const [error, setError] = useState("");

  const bookTable = async () => {
    if (!startTime || !endTime) {
      setError("*Please select both start and end times.");
      return;
    }
    
    try {
      await axios.post("/api/users/bookTable", {
        tableId: table._id,
        startTime,
        endTime,
      });
      toast.success("Table booked successfully");
      setBooked(true);
      setError("");
    } catch (error: any) {
      console.error("Error booking table:", error.message);
      toast.error("The slot is already booked.");
    }
  };

  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg bg-white p-6 m-4 hover:shadow-2xl transition-shadow duration-300">
      <h3 className="font-bold text-xl mb-2">Table {table.tableNumber}</h3>
      <p className="text-gray-700 text-base mb-2">Capacity: {table.capacity}</p>
      <h4 className="font-bold mt-4 mb-2">Booked Slots:</h4>
      {table.bookings && table.bookings.length > 0 ? (
        table.bookings.map((booking, index) => (
          <div key={index} className="mt-1 mb-2 p-2 bg-gray-100 rounded">
            <p className="text-gray-600">Booking {index + 1}</p>
            <p className="text-gray-600">Start: {new Date(booking.startTime).toLocaleString()}</p>
            <p className="text-gray-600">End: {new Date(booking.endTime).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No bookings available</p>
      )}
      {!booked && (
        <div className="mt-4">
          <h5 className="font-bold mb-2">Select your preferred date and time:</h5>
          <div className="mb-4">
            <input
              type="datetime-local"
              className="border rounded px-4 py-2 w-full mb-2"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setError(""); // Clear error when user selects time
              }}
            />
            <input
              type="datetime-local"
              className="border rounded px-4 py-2 w-full"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setError(""); // Clear error when user selects time
              }}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <button
            onClick={bookTable}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            Book Table
          </button>
        </div>
      )}
    </div>
  );
};

export default TableCard;
