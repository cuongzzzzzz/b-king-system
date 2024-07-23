const { ValidationError } = require("mongoose");
const { findOneAndUpdate } = require("../models/booking.model");
const Station = require("../models/station.model");
const { removeNullValueUpdate } = require("../utils");
const { ResourceNotFoundError } = require("../cores/errorResponse");

const validateStationData = (stationData) => {
  const { name, address, city, state, zipCode, latitude, longitude, type } =
    stationData;

  if (
    !name ||
    !address ||
    !city ||
    !state ||
    !zipCode ||
    !latitude ||
    !longitude ||
    !type
  ) {
    throw new ValidationError("Vui lòng cung cấp đầy đủ thông tin ga!");
  }

  if (!/^\d{5}(?:[-\s]\d{4})?$/.test(zipCode)) {
    throw new ValidationError("Mã zip không hợp lệ!");
  }

  if (latitude < -90 || latitude > 90) {
    throw new ValidationError("Vĩ độ không hợp lệ!");
  }
  if (longitude < -180 || longitude > 180) {
    throw new ValidationError("Kinh độ không hợp lệ!");
  }
};

const createStation = async (stationData) => {
  // validateStationData(stationData);

  const existingStation = await Station.findOne({
    name: stationData.name,
    isActive: true,
  });
  if (existingStation) {
    throw new Error("Ga này đã tồn tại!");
  }

  const newStation = await Station.create(stationData);
  return newStation;
};

const getOneStation = async (_id) => {
  const foundStation = await Station.findOne({ _id, isActive: true });
  if (!foundStation) {
    throw new Error("Ga không tồn tại!");
  }
  return foundStation;
};

const getAllStations = async ({ limit = 10, page = 1, sortBy = "city", sortDirection = "asc" }) => {
  let totalPage

  const skip = limit * (page - 1)
  const a = await Station.find({ isActive: true }).lean()
  totalPage = Math.ceil(a.length / limit)
  const allStations = await Station.find({ isActive: true }).skip(skip).limit(limit).sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 }).lean();
  return { data: [...allStations], totalPage, currentPage: page };
};

const getAllStationsByQuery = async (query) => {
  const { sortBy = "city", sortDirection = "asc", page = 1, limit = 10, search, type } = query
  const filter = {}
  const skip = (page - 1) * limit
  console.log("query : ", query)

  filter.isActive = true

  if (search && search.length > 0) {
    filter.$text = { $search: search }
  }
  if (type && type.length > 0) {
    filter.type = type
  }
  console.log(filter)

  const staionsByQuery = await Station.find(filter)
    .limit(limit)
    .skip(skip)
    .sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
    .lean()
  const staionsByQueryRaw = await Station.find(filter)
    .sort({ [sortBy]: sortDirection == "asc" ? 1 : -1 })
    .lean()

  totalPage = Math.ceil(staionsByQueryRaw.length / limit)

  return { data: [...staionsByQuery], totalPage, currentPage: page }
}



const updateOneStation = async (id, stationData) => {
  const { ...updateData } = stationData;

  // validateStationData(updateData);

  const foundStation = await Station.findOne({ _id: id, isActive: true });
  if (!foundStation) {
    throw new Error("Ga này không tồn tại!");
  }

  const updateObj = removeNullValueUpdate(updateData);
  console.log(updateObj);

  const updatedStation = await Station.findOneAndUpdate(
    { _id: id },
    updateObj,
    {
      new: true,
    }
  );
  if (!updatedStation || !updatedStation.isModified) {
    throw new Error("Cập nhật ga không thành công!");
  }
  return updatedStation;
};

const deleteStation = async (_id) => {
  const deletedStation = await Station.findOneAndUpdate(
    { _id, isActive: true },
    { isActive: false },
    { new: true }
  );
  if (!deletedStation) {
    throw new Error("Ga không tìm thấy hoặc đã bị xóa!");
  }
  return deletedStation;
};

const getUniqueStation = async ({ type = "bus" }) => {
  const stations = await Station.find({ isActive: true, type }).lean();
  if (!stations) throw new ResourceNotFoundError("Gặp lỗi khi lấy dữ liệu");
  let res = {}
  stations.forEach((station) => {
    if (!res[station.city]) res[station.city] = station.zipCode
  })
  return res
};

module.exports = {
  getUniqueStation,
  getAllStations,
  getOneStation,
  updateOneStation,
  deleteStation,
  createStation,
  getAllStationsByQuery
};
