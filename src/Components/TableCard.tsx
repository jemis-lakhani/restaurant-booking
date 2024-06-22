import React from "react";

type TableProps = {
  table: {
    tableNumber: number;
    capacity: number;
    startTime: string;
    endTime: string;
    restaurantId: string;
  };
};

const TableCard: React.FC<TableProps> = ({ table }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold">Table {table.tableNumber}</h3>
      <p>Capacity: {table.capacity}</p>
      <p>Start Time: {new Date(table.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(table.endTime).toLocaleString()}</p>
      <p>Restaurant ID: {table.restaurantId}</p>
    </div>
  );
};

export default TableCard;
