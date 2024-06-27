import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connection.on("connected", () => {});

  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default dbConnect;
