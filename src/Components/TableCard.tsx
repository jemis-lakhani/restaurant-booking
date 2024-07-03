import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type TableProps = {
  table: {
    _id: string;
    tableNumber: number;
    capacity: number;
    restaurantId: string;
    bookings?: Booking[];
  };
};

type Booking = {
  startTime: string;
  endTime: string;
  userId: string;
  username: string;
  email: string;
};

const TableCard: React.FC<TableProps> = ({ table }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");
  const [showBookings, setShowBookings] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState({ openTime: "", closeTime: "" });

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    } else {
      console.error("Role not found in local storage");
    }
  }, []);

  const bookTable = async () => {
    if (!startTime || !endTime) {
      setError("*Please select both start and end times.");
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setError("*Start time must be before end time.");
      return;
    }

    try {
      const userDetails = await axios.get("/api/users/me");
      const { username, email } = userDetails.data.data;

      await axios.post("/api/users/bookTable", {
        tableId: table._id,
        startTime,
        endTime,
        username,
        email,
      });
      toast.success("Table booked successfully");
      setBooked(true);
      setError("");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error("Error booking table:", error.message);
      const errorMessage =
        error.response?.data?.error || "booking failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const getFilteredBookings = () => {
    const currentTime = new Date();
    return (
      table.bookings?.filter(
        (booking) => new Date(booking.endTime) > currentTime
      ) || []
    );
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg p-6 m-4 hover:shadow-2xl transition-shadow duration-300 bg-gray-200">
      <h3 className="font-bold text-xl mb-2">Table no. {table.tableNumber}</h3>
      <p className="text-gray-700 text-base mb-2">Capacity: {table.capacity}</p>
      {role === "user" && !booked && (
        <div className="mt-4">
          <h5 className="font-bold mb-2">
            Select your preferred date and time:
          </h5>
          <div className="mb-4">
            <input
              type="datetime-local"
              className="border rounded px-4 py-2 w-full mb-2"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setError("");
              }}
            />
            <input
              type="datetime-local"
              className="border rounded px-4 py-2 w-full"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setError("");
              }}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <button
            onClick={bookTable}
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            Book Table
          </button>
        </div>
      )}

      {role === "restaurantOwner" && (
        <button
          onClick={() => setShowBookings(!showBookings)}
          className=" text-blue-800 rounded-md ml-1 mt-2 hover:text-blue-600 hover:underline transition-colors duration-300"
        >
          {showBookings ? "Hide Booked Slots" : "See Booked Slot List"}
        </button>
      )}

      {showBookings && (
        <div className="mt-4">
          <h4 className="font-bold mb-2">Booked Slots:</h4>
          {getFilteredBookings().length > 0 ? (
            getFilteredBookings().map((booking, index) => (
              <div key={index} className="mt-1 mb-2 p-2 bg-zinc-50 rounded">
                <p className="text-gray-600">Booking: {index + 1}</p>
                <p className="text-gray-600">Username: {booking.username}</p>
                <p className="text-gray-600">Email: {booking.email}</p>
                <p className="text-gray-600">
                  Start: {new Date(booking.startTime).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  End: {new Date(booking.endTime).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No bookings available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TableCard;
