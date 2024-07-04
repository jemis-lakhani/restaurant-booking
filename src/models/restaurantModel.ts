import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactInfo: { type: String, required: true },
  description: { type: String, required: true },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  openTime: { type: String, required: true },
  closeTime: { type: String, required: true },
});

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
