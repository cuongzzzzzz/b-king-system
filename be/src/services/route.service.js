const { findOneAndUpdate } = require("../models/booking.model");
const Route = require("../models/route.model");
const Station = require("../models/station.model");
const { removeNullValueUpdate } = require("../utils");

const createRoute = async ({
  startStationId,
  endStationId,
  distance,
  duration,
  price,
  type,
  isActive = true,
}) => {
  // if (
  //   !name ||
  //   !startStationId ||
  //   !endStationId ||
  //   !distance ||
  //   !duration ||
  //   !price
  // ) {
  //   throw new Error("Missing required route information.");
  // }

  const startStation = await Station.findById(startStationId);
  const endStation = await Station.findById(endStationId);
  if (!startStation || !endStation) {
    throw new Error("Invalid station IDs. Stations must exist.");
  }
  const name = `Tuyến ${startStation.city} - ${endStation.city}`

  const existingRoute = await Route.findOne({ name, isActive: true });
  if (existingRoute) {
    throw new Error("Route with the same name already exists.");
  }
  const newRoute = await Route.create({
    name,
    startStationId,
    endStationId,
    distance,
    duration,
    price,
    type,
    isActive,
  });
  return newRoute;
};

const getOneRoute = async ({ _id }) => {
  const foundRoute = await Route.findOne({ _id, isActive: true })
    .populate("startStationId")
    .populate("endStationId");
  if (!foundRoute) {
    throw new Error("Route not found.");
  }
  return foundRoute;
};

const getAllRoutes = async ({ type, limit = 10, page = 1 }) => {
  const skip = 10 * (page - 1)
  const filter = { isActive: true }
  if (type) {
    filter.type = type
  }
  const allRoutes = await Route.find(filter)
    .populate("startStationId")
    .populate("endStationId").skip(skip).limit(limit)
    .lean();
  return allRoutes;
};


const updateOneRoute = async ({
  _id,
  name,
  startStationId,
  endStationId,
  distance,
  duration,
  price,
  isActive,
}) => {
  const foundRoute = await Route.findOne({ _id, isActive: true });
  if (!foundRoute) {
    throw new Error("Route not found.");
  }

  if (startStationId && !(await Station.findById(startStationId))) {
    throw new Error("Invalid start station ID. Station must exist.");
  }
  if (endStationId && !(await Station.findById(endStationId))) {
    throw new Error("Invalid end station ID. Station must exist.");
  }

  const updateObj = removeNullValueUpdate({
    name,
    startStationId,
    endStationId,
    distance,
    duration,
    price,
    isActive,
  });

  const updatedRoute = await Route.findOneAndUpdate({ _id }, updateObj, {
    new: true,
  });
  if (!updatedRoute) {
    throw new Error("Route update failed.");
  }
  return updatedRoute;
};

const deleteRoute = async ({ _id }) => {
  const deletedRoute = await Route.findOneAndUpdate(
    { _id, isActive: true },
    { isActive: false },
    { new: true }
  );
  if (!deletedRoute) {
    throw new Error("Route not found or already deleted.");
  }
  return deletedRoute;
};

module.exports = {
  getAllRoutes,
  getOneRoute,
  updateOneRoute,
  deleteRoute,
  createRoute,
};
