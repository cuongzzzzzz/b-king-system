const mongoose = require("mongoose");
const COLLECTION_NAME = "Station";
const DOCUMENT_NAME = "Stations";

const StationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    type: {
      type: String,
      enum: ["bus", "train", "air_plane"],
    },

    facilities: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);


StationSchema.index({
  name: "text",
  city: "text",
  address: "text"
});

const Station = mongoose.model(DOCUMENT_NAME, StationSchema);

module.exports = Station;
