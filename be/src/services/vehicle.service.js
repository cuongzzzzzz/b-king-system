const Carrier = require("../models/carrier.model");
const Vehicle = require("../models/vehicle.model");
const { removeNullValueUpdate } = require("../utils");

const createVehicle = async (vehicleData) => {
  const requiredFields = ["name", "provider", "numberOfSeats", "licensePlate"];
  const missingFields = requiredFields.filter((field) => !vehicleData[field]);
  if (missingFields.length > 0) {
    throw new Error(`Thông tin bắt buộc thiếu: ${missingFields.join(", ")}`);
  }

  const carrier = await Carrier.findById(vehicleData.provider);
  if (!carrier) {
    throw new Error("Nhà cung cấp vận tải không tìm thấy!");
  }

  const existingVehicle = await Vehicle.findOne({
    licensePlate: vehicleData.licensePlate,
  });
  if (existingVehicle) {
    throw new Error("Biển số xe đã tồn tại!");
  }

  const newVehicle = await Vehicle.create(vehicleData);
  return newVehicle;
};

const getOneVehicle = async (_id) => {
  const foundVehicle = await Vehicle.findById(_id).populate("provider");
  if (!foundVehicle) {
    throw new Error("Xe không tìm thấy!");
  }
  return foundVehicle;
};

const getAllVehicles = async (filter = {}) => {
  const vehicleFilters = {};

  if (filter.provider) {
    vehicleFilters.provider = filter.provider;
  }

  if (filter.isActive !== undefined) {
    vehicleFilters.isActive = filter.isActive;
  }

  if (filter.licensePlate) {
    vehicleFilters.licensePlate = new RegExp(filter.licensePlate, "i");
  }


  const vehicles = await Vehicle.find(vehicleFilters).populate("provider");
  return vehicles;
};

const updateOneVehicle = async (_id, updateData) => {
  const allowedUpdates = ["name", "description", "amenities", "isActive"];
  const updateObject = removeNullValueUpdate(updateData);
  const invalidUpdates = Object.keys(updateObject).filter(
    (field) => !allowedUpdates.includes(field)
  );
  if (invalidUpdates.length > 0) {
    throw new Error(
      `Không thể cập nhật các trường: ${invalidUpdates.join(", ")}`
    );
  }

  if (updateData.licensePlate) {
    const existingVehicle = await Vehicle.findOne({
      licensePlate: updateData.licensePlate,
    });
    if (existingVehicle && existingVehicle._id.toString() !== _id) {
      throw new Error("Biển số xe đã tồn tại!");
    }
  }

  const updatedVehicle = await Vehicle.findByIdAndUpdate(_id, updateObject, {
    new: true,
  });
  if (!updatedVehicle) {
    throw new Error("Cập nhật xe không thành công!");
  }
  return updatedVehicle;
};

const deleteVehicle = async (_id) => {
  const deletedVehicle = await Vehicle.findByIdAndUpdate(
    _id,
    { isActive: false },
    { new: true }
  );
  if (!deletedVehicle) {
    throw new Error("Xe không tìm thấy hoặc đã bị xóa!");
  }
  return deletedVehicle;
};

const getVehicleByCarrierId = async (id) => {
  const vehicles = await Vehicle.find({
    provider: id
  }).lean()
  return vehicles
}

module.exports = {
  createVehicle,
  getOneVehicle,
  getAllVehicles,
  updateOneVehicle,
  deleteVehicle,
  getVehicleByCarrierId
};
