const mongoose = require("mongoose");
const COLLECTION_NAME = "Key";
const DOCUMENT_NAME = "Keys";
const KeySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    refreshToken: {
      required: true,
      type: String,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: [],
      default: [],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

const Key = mongoose.model(DOCUMENT_NAME, KeySchema);

module.exports = Key;
