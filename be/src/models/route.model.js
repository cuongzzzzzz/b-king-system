const mongoose = require("mongoose");
const COLLECTION_NAME = "Route";
const DOCUMENT_NAME = "Routes";
const RouteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startStationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stations",
      required: true,
    },
    endStationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stations",
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["train", "bus", "air_plane"],
      require: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

const Route = mongoose.model(DOCUMENT_NAME, RouteSchema);

module.exports = Route;
