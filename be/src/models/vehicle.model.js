const mongoose = require("mongoose");

const COLLECTION_NAME = "Vehicle";
const DOCUMENT_NAME = "Vehicles";

const VehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carriers",
      required: true,
    },
    numberOfSeats: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    licensePlate: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["bus", "train", "air_plane"]
    }
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = mongoose.model(DOCUMENT_NAME, VehicleSchema);
