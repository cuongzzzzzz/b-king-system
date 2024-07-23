const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const COLLECTION_NAME = "User";
const DOCUMENT_NAME = "Users";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    // role: {
    //   type: Number,
    //   enum: [1, 2], // 1: Admin, 2: Khách hàng
    //   default: 2,
    // },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

const User = mongoose.model(DOCUMENT_NAME, UserSchema);

module.exports = User;
