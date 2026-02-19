// models/Hotel.js
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
