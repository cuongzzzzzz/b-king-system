const User = require("../models/user.model"); 
const bcrypt = require("bcrypt"); 

const createUser = async (userData) => {
  const requiredFields = [
    "username",
    "password",
    "email",
    "phoneNumber",
  ];
  const missingFields = requiredFields.filter((field) => !userData[field]);
  if (missingFields.length > 0) {
    throw new Error(`Thông tin bắt buộc thiếu: ${missingFields.join(", ")}`); 
  }

  const existingUsername = await User.findOne({ username: userData.username });
  if (existingUsername) {
    throw new Error("Tên đăng nhập đã tồn tại!");
  }

  const existingEmail = await User.findOne({ email: userData.email });
  if (existingEmail) {
    throw new Error("Email đã được sử dụng!"); 
  }

  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  const newUser = await User.create(userData);
  return newUser;
};

const getUserById = async (_id) => {
  const foundUser = await User.findById(_id).select("-password"); 
  if (!foundUser) {
    throw new Error("Người dùng không tìm thấy!"); 
  }
  return foundUser;
};

const getAllUsers = async (filter = {}) => {
  const userFilters = {};

  if (filter.role) {
    userFilters.role = filter.role;
  }

  if (filter.isActive !== undefined) {
    userFilters.isActive = filter.isActive;
  }

  if (filter.username) {
    userFilters.username = new RegExp(filter.username, "i");
  }


  const users = await User.find(userFilters).select("-password"); 
  return users;
};

const updateUserById = async (_id, updateData) => {
  const allowedUpdates = ["fullname", "email", "phoneNumber", "address"]; 
  const updateObject = removeNullValueUpdate(updateData);
  const invalidUpdates = Object.keys(updateObject).filter(
    (field) => !allowedUpdates.includes(field)
  );
  if (invalidUpdates.length > 0) {
    throw new Error(
      `Không thể cập nhật các trường: ${invalidUpdates.join(", ")}`
    ); 
  }

  if (updateData.email) {
    const existingEmail = await User.findOne({ email: updateData.email });
    if (existingEmail && existingEmail._id.toString() !== _id) {
      throw new Error("Email đã được sử dụng!");
    }
  }

  const updatedUser = await User.findByIdAndUpdate(_id, updateObject, {
    new: true,
  }).select("-password"); 
  if (!updatedUser) {
    throw new Error("Cập nhật người dùng không thành công!"); 
  }
  return updatedUser;
};

const deleteUserById = async (_id) => {
  const deletedUser = await User.findByIdAndUpdate(
    _id,
    { isActive: false },
    { new: true }
  );
  if (!deletedUser) {
    throw new Error("Người dùng không tìm thấy hoặc đã bị xóa!"); 
  }
  return deletedUser;
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
