import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tableNumber: { type: Number, required: true },
  capacity: { type: Number, required: true },
  startTime: { type: Date },
  endTime: { type: Date },
  bookings: [{
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  }],
});

const Table = mongoose.models.Table || mongoose.model("Table", TableSchema);

export default Table;
