const mongoose = require("mongoose");

const COLLECTION_NAME = "Trip";
const DOCUMENT_NAME = "Trips";
const TripSchema = new mongoose.Schema(
  {
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routes",
    },
    departureDate: {
      type: Date,
      required: true,
    },
    departureCity: {
      type: String,
      require: true
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    arrivalCity: {
      type: String,
      require: true
    },

    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicles",
      required: true,
    },
    type: {
      type: String,
      enum: ["bus", "train", "air_lane"],
      required: true
    },

    numberOfSeats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      enum: [1, 2, 3], // 1: Chờ khởi hành, 2: Đang di chuyển, 3: Hoàn thành
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

// Tạo model cho bảng Trip
const Trip = mongoose.model(DOCUMENT_NAME, TripSchema);

module.exports = Trip;
