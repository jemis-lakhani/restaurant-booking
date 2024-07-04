import mongoose from "mongoose";

const TableSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  tableNumber: { type: Number, required: true },
  capacity: { type: Number, required: true },
  bookings: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      username: { type: String },
      email: { type: String },
    },
  ],
});

const Table = mongoose.models.Table || mongoose.model("Table", TableSchema);

export default Table;
