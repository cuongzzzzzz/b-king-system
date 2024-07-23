const { ConflictError, ResourceNotFoundError } = require("../cores/errorResponse");
const Carrier = require("../models/carrier.model");
const { removeNullValueUpdate } = require("../utils");
const bcrypt = require("bcrypt")

const getAllCarriers = async () => {
  const carriers = await Carrier.find({ isActive: true }).lean();
  return carriers;
};

const getOneCarrier = async (carrierId) => {
  const carrier = await Carrier.findById(carrierId);
  if (!carrier) {
    throw new Error("Nhà cung cấp vận tải không tìm thấy.");
  }
  return carrier;
};

const createCarrier = async (carrierData) => {

  const requiredFields = ["name", "email", "phone", "password"];
  const missingFields = requiredFields.filter((field) => !carrierData[field]);
  if (missingFields.length > 0) {
    throw new Error(`Thông tin bắt buộc thiếu: ${missingFields.join(", ")}`);
  }


  const foundCarrier = Carrier.findOne({
    email: carrierData.email,
    isActive: true,
  });
  if (!foundCarrier) throw new ConflictError("Nha xe da ton tai");
  const hashPassword = bcrypt.hashSync(carrierData.password, 10)
  const newCarrier = await Carrier.create({ ...carrierData, password: hashPassword });
  return newCarrier;
};

const updateOneCarrier = async (carrierId, updateData) => {
  const updateObject = removeNullValueUpdate(updateData);
  const carrier = await Carrier.findByIdAndUpdate(carrierId, updateObject, {
    new: true,
  });
  if (!carrier) {
    throw new ResourceNotFoundError("Nhà cung cấp vận tải không tìm thấy.");
  }
  return carrier;
};

const deleteCarrier = async (carrierId) => {
  const deletedCarrier = await Carrier.findByIdAndUpdate(
    carrierId,
    { isActive: false },
    { new: true }
  );
  if (!deletedCarrier) {
    throw new ConflictError("Nhà cung cấp vận tải không tìm thấy hoặc đã bị xóa.");
  }
  return deletedCarrier;
};

module.exports = {
  getAllCarriers,
  getOneCarrier,
  createCarrier,
  updateOneCarrier,
  deleteCarrier,
};
