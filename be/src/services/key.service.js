const Key = require("../models/key.model");

const createKey = async ({ refreshToken, publicKey, privateKey, userId }) => {
  const foundUSer = await Key.findOne({ _id: userId });
  if (foundUSer) throw new Error("key store is existed!");

  const newKey = Key.create({ refreshToken, publicKey, privateKey, userId });
  return newKey;
};

module.exports = { createKey };
