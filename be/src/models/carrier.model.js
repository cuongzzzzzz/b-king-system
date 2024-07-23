const { string } = require("joi");
const { default: mongoose } = require("mongoose");
const COLLECTION_NAME = "Carrier";
const DOCUMENT_NAME = "Carriers";

const CarrierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    logo: {
      type: String,
      default:""
    },
    contactInfo: {
      type: Object,
      properties: {
        address: {
          type: String,
          default: ""
        },
        phoneNumber: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        website: {
          type: String,
          default: ""
        },
      },
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5
    },
    numberOfVehicles: {
      type: Number,
      default: 0
    },
    routes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const Carrier = mongoose.model(DOCUMENT_NAME, CarrierSchema);

module.exports = Carrier;
