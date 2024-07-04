import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Table = {
  _id: string;
  tableNumber: number;
  capacity: number;
};

type EditTableFormProps = {
  table: Table;
  onTableUpdated: (updatedTable: Table) => void;
};

const EditTableForm: React.FC<EditTableFormProps> = ({
  table,
  onTableUpdated,
}) => {
  const [tableNumber, setTableNumber] = useState(table.tableNumber);
  const [capacity, setCapacity] = useState(table.capacity);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/users/tables", {
        _id: table._id,
        tableNumber,
        capacity,
      });
      toast.success("Table updated successfully");
      onTableUpdated(response.data);
    } catch (error: any) {
      toast.error("Failed to update table");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Table Number
        </label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Capacity
        </label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Table
      </button>
    </form>
  );
};

export default EditTableForm;
