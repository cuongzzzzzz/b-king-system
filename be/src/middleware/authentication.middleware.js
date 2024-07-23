const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Key = require("../models/key.model");
const { UnauthorizedError, ResourceNotFoundError } = require("../cores/errorResponse");
const Carrier = require("../models/carrier.model");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  REFRESH_TOKEN: "x-rftoken-key",
  CLIENT_ID: "x-client-key",
};
const authentication = async (req, res, next) => {

  //1.kiem tra id nguoi dung co ton tai hay k ?
  try {
    const userId = req.headers[HEADER.CLIENT_ID];
    console.log(req.headers);
    if (!userId) throw new UnauthorizedError("invalid request");
    let foundUser
    foundUser = await User.findOne({ _id: userId });
    if (!foundUser) foundUser = await Carrier.findOne({ _id: userId })
    if (!foundUser) throw new ResourceNotFoundError("user is not existed");

    const keyStore = await Key.findOne({
      userId: userId,
    });
    if (!keyStore) throw new UnauthorizedError("invalid request");

    //kiem tra rftoken co ton tai hay khong ?
    const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
    if (refreshToken) {
      try {
        const decode = jwt.verify(refreshToken, keyStore.privateKey);
        if (decode.id !== userId) throw new UnauthorizedError("invalid request");
        delete decode.exp;

        req.keyStore = keyStore;
        req.user = decode;
        req.refreshToken = refreshToken;
        console.log("da chay vao day");
        return next();
      } catch (error) {
        throw error;
      }
    }

    //kiem tra access token co ton tai ?
    const accessToken = req.headers[HEADER.AUTHORIZATION];

    if (!accessToken) throw new UnauthorizedError("invalid request");

    try {
      const decode = jwt.verify(accessToken, keyStore.publicKey);
      if (decode.id !== userId) throw new UnauthorizedError("invallid user");

      req.role = foundUser.role;
      req.user = decode;
      req.keyStore = keyStore;
      return next();
    } catch (error) {
      throw error;
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports = { authentication };
