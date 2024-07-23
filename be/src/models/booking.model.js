const { required } = require("joi");
const mongoose = require("mongoose");

const COLLECTION_NAME = "Booking";
const DOCUMENT_NAME = "Bookings";

const BookingSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookingCode: {
      type: String,
      required: true,
    },
    passengerName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    numberOfTickets: {
      type: Number,
      required: true,
    },
    carrierId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
    ,
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: {},
      default: {},
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    notes: {
      type: String,
    },
    gest: {
      passengerName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
      default: {},
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

const Booking = mongoose.model(DOCUMENT_NAME, BookingSchema);

module.exports = Booking;
