const jwt = require("jsonwebtoken");
const createPairKeys = ({ publicKey, privateKey, payload }) => {
  const accessToken = jwt.sign(payload, publicKey, {
    expiresIn: "2 days",
  });

  const refreshToken = jwt.sign(payload, privateKey, {
    expiresIn: "7 days",
  });
  return { accessToken, refreshToken };
};

module.exports = { createPairKeys };
