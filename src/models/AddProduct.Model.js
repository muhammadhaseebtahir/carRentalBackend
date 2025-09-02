const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_Id: {
      type: String,
      required: true,
      trim: true,
      unique: true, // 👈 agar product_Id unique hona chahiye
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1900, // 👈 car year limit
      max: new Date().getFullYear() + 1, // 👈 current ya next year tak
    },
    pricePerDay: {
      type: Number,
      required: true,
      min: 1, // 👈 0 se kam price allow na ho
    },
    category: {
      type: String,
      required: true,
      enum: ["Sedan", "SUV", "Van"], // 👈 only valid categories
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual", "Semi-Automatic"], // 👈 restrict values
    },
    fuel_type: {
      type: String,
      required: true,
      enum: ["Gas", "Diesel", "Petrol", "Electric", "Hybrid"], // 👈 restrict values
    },
    seating_capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  //  image: {
  //  type: String,
  //  required: true,
  //   },
    status: {
      type: String,
      enum: ["available", "unavailable", "maintenance"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarProduct", ProductSchema);
