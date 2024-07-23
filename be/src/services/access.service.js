const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { createKey } = require("./key.service");
const { createPairToken } = require("../utils");
const { validateInput, loginSchema, registerSchema } = require("../schema");
const Key = require("../models/key.model");
const crypto = require("crypto");
const Carrier = require("../models/carrier.model")
const { BadRequestError, ResourceNotFoundError } = require("../cores/errorResponse");

const login = async ({ email, password }) => {
  const { error } = validateInput(loginSchema, { email, password });
  let model
  if (error) {
    const errors = error.details.map((item) => item.message);

    throw new BadRequestError(errors);
  }
  let foundUser
  foundUser = await User.findOne({ email });
  model = "user"

  if (!foundUser) {
    foundUser = await Carrier.findOne({ email })
    model = "carrier"
  }
  console.log(foundUser)
  const { password: hashPassword, ...info } = foundUser;
  info.model = model


  if (!foundUser) throw new ResourceNotFoundError("User or password is wrong! Pls try again!");
  const isCheckPassword = bcrypt.compareSync(password, foundUser.password);
  if (!isCheckPassword)
    throw new BadRequestError("User or password is wrong! Pls try again!");

  const foundKey = await Key.findOne({ userId: foundUser._id });
  const payload = {
    id: foundUser._id,
    email: foundUser.email,
    // phoneNumber: foundUser.phoneNumber,
  };
  console.log(foundKey)
  if (!foundKey) {
    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");

    const { accessToken, refreshToken } = createPairToken(
      {
        publicKey,
        privateKey,
        payload
      }
    );
    // console.log(publicKey, privateKey)


    const newKey = await createKey({
      refreshToken,
      privateKey,
      publicKey,
      userId: foundUser._id,
    });
    console.log(newKey)
    if (!newKey) throw new BadRequestError("create Key faild");
    return {
      ...info._doc,
      model,
      accessToken,
      refreshToken,
    };
  }

  const publicKey = foundKey.publicKey;
  const privateKey = foundKey.privateKey;

  const { accessToken, refreshToken } = createPairToken({
    publicKey,
    privateKey,
    payload,
  });

  const updateKey = await Key.findOneAndUpdate(
    { userId: foundUser._id },
    { refreshToken },
    { new: true, upsert: true }
  );

  return {
    ...info._doc,
    model,
    accessToken,
    refreshToken,
  };
};

const register = async ({
  username,
  password,
  email,
  confirmPassword,
  phoneNumber,
}) => {
  const { error } = validateInput(registerSchema, {
    username,
    password,
    email,
    phoneNumber,
    confirmPassword,
  });
  console.log(error);
  if (error) {
    const errors = error.details.map((item) => item.message);

    throw new Error(errors);
  }

  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("email is existed!");

  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("Username is existed!");

  const foundPhone = await User.findOne({ phoneNumber });
  if (foundPhone) throw new Error("Phone number is existed!");
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = await User.create({
    username,
    password: hashedPassword,
    email,
    phoneNumber,
  });

  if (newUser) {
    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");
    const payload = {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
    };
    console.log(publicKey, privateKey);
    const { accessToken, refreshToken } = createPairToken({
      publicKey,
      privateKey,
      payload,
    });
    const newKey = createKey({
      refreshToken,
      privateKey,
      publicKey,
      userId: newUser._id,
    });

    if (!newKey) throw new Error("create Key faild");
    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      accessToken,
      refreshToken,
    };
  }
  return null;
};

const handleRefreshToken = async ({ refreshToken, user, keyStore }) => {
  const foundRefreshTokenUsed = keyStore.refrehTokensUsed.include(refreshToken);
  if (foundRefreshTokenUsed) {
    const deleteKey = await Key.findOneAndDelete({ userId: user.id });
    throw new Error("Some thing went wrong! Plz try again!");
  }

  const publicKey = keyStore.publicKey;
  const privateKey = keyStore.privateKey;

  const pairKeys = await createPairToken({
    publicKey,
    privateKey,
    payload: user,
  });

  const updateKey = await Key.findOneAndUpdate(
    { userId: user.id },
    {
      $set: { refreshToken: pairKeys.refreshToken },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    },
    {
      new: true,
    }
  );

  return {
    ...user,
    pairKeys,
  };
};

const logOut = async ({ user }) => {
  return await Key.findOneAndDelete({ userId: user.details });
};

module.exports = {
  login,
  register,
  handleRefreshToken,
  logOut,
};
