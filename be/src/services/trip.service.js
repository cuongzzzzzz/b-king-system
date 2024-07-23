const { default: mongoose } = require("mongoose");
const Trip = require("../models/trip.model");
const { removeNullValueUpdate } = require("../utils");

const createTrip = async (tripData) => {
  const requiredFields = [
    "routeId",
    "departureDate",
    "arrivalDate",
    "departureTime",
    "arrivalTime",
    "vehicleType",
    "numberOfSeats",
    "price",
  ];
  const missingFields = requiredFields.filter((field) => !tripData[field]);
  if (missingFields.length > 0) {
    throw new Error(`Thông tin bắt buộc thiếu: ${missingFields.join(", ")}`);
  }

  const newTrip = await Trip.create(tripData);
  return newTrip;
};

const getOneTrip = async (_id) => {
  const pipeLine = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(_id),
        isActive: true
      },
    },
    {
      $lookup: {
        from: "Route",
        localField: "routeId",
        foreignField: "_id",
        as: "route",
      },
    },
    {
      $unwind: "$route",
    },
    {
      $lookup: {
        from: "Vehicle",
        localField: "vehicleType",
        foreignField: "_id",
        as: "vehicle",
      },
    },
    { $unwind: "$vehicle" },
    {
      $lookup: {
        from: "Carrier",
        localField: "vehicle.provider",
        foreignField: "_id",
        as: "carrier",
      },
    },
    { $unwind: "$carrier" },
    {
      $lookup: {
        from: "Station",
        localField: "route.startStationId",
        foreignField: "_id",
        as: "startStation",
      },
    },
    { $unwind: "$startStation" },
    {
      $lookup: {
        from: "Station",
        localField: "route.endStationId",
        foreignField: "_id",
        as: "endStation",
      },
    },
    { $unwind: "$endStation" },
  ];

  const trip = await Trip.aggregate(pipeLine);
  if (!trip) {
    throw new Error("Chuyến đi không tìm thấy.");
  }
  return trip;
};

const getAllTrips = async (
  { page = 1, limit = 10, sortBy = "price", sortDirection = "asc", type }

) => {

  const filter = {}
  const tripFilters = {};

  if (filter.status) {
    tripFilters.status = filter.status;
  }
  if (!type) {
    tripFilters.type = "bus"
  }

  if (filter.routeId) {
    tripFilters.routeId = filter.routeId;
  }

  if (filter.departureDateFrom && filter.departureDateTo) {
    tripFilters.departureDate = {
      $gte: filter.departureDateFrom,
      $lte: filter.departureDateTo,
    };
  }

  // const trips = await Trip.find(tripFilters)
  //   .populate("routeId")
  //   .populate("vehicleType");
  // return trips;
  const pipeLine = [
    {
      $match: {
        isActive: true
      },
    },
    {
      $lookup: {
        from: "Route",
        localField: "routeId",
        foreignField: "_id",
        as: "route",
      },
    },
    {
      $unwind: "$route",
    },
    {
      $lookup: {
        from: "Vehicle",
        localField: "vehicleType",
        foreignField: "_id",
        as: "vehicle",
      },
    },
    { $unwind: "$vehicle" },
    {
      $lookup: {
        from: "Carrier",
        localField: "vehicle.provider",
        foreignField: "_id",
        as: "carrier",
      },
    },
    { $unwind: "$carrier" },
    {
      $lookup: {
        from: "Station",
        localField: "route.startStationId",
        foreignField: "_id",
        as: "startStation",
      },
    },
    { $unwind: "$startStation" },
    {
      $lookup: {
        from: "Station",
        localField: "route.endStationId",
        foreignField: "_id",
        as: "endStation",
      },
    },
    { $unwind: "$endStation" },
    {
      $sort: {
        [sortBy]: sortDirection === "asc" ? 1 : -1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: +limit,
    },
  ];

  return await Trip.aggregate(pipeLine);
};

const searchTripsV2 = async (query) => {
  const {
    departureStation,
    arrivalStation,
    departureDate,
    sortBy,
    sortDirection,
    page = 1,
    limit = 10,
    type
  } = query;

  const aggregatePipeline = [
    {
      $match: {
        departureDate: { $gte: new Date(departureDate) },
        isActive: true,
      },
    },
    {
      $lookup: {
        from: "Route",
        localField: "routeId",
        foreignField: "_id",
        as: "route",
      },
    },
    {
      $unwind: "$route",
    },
    {
      $match: {
        "route.startStationId": new mongoose.Types.ObjectId(departureStation),
        "route.endStationId": new mongoose.Types.ObjectId(arrivalStation),
      },
    },
    {
      $lookup: {
        from: "Vehicle",
        localField: "vehicleType",
        foreignField: "_id",
        as: "vehicle",
      },
    },
    { $unwind: "$vehicle" },
    {
      $lookup: {
        from: "Carrier",
        localField: "vehicle.provider",
        foreignField: "_id",
        as: "carrier",
      },
    },
    { $unwind: "$carrier" },
    {
      $lookup: {
        from: "Station",
        localField: "route.startStationId",
        foreignField: "_id",
        as: "startStation",
      },
    },
    { $unwind: "$startStation" },
    {
      $lookup: {
        from: "Station",
        localField: "route.endStationId",
        foreignField: "_id",
        as: "endStation",
      },
    },
    { $unwind: "$endStation" },
    {
      $sort: {
        [sortBy]: sortDirection === "asc" ? 1 : -1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: +limit,
    },
  ];

  const res = await Trip.aggregate(aggregatePipeline);
  return res;
};

const searchTripsV3 = async (query) => {
  const {
    departureCity,
    arrivalCity,
    departureDate,
    sortBy,
    type = "bus",
    sortDirection,
    page = 1,
    limit = 10,
  } = query;


  console.log(new Date(departureDate))
  const filterTrips = await Trip.aggregate([
    {
      $match: {
        departureDate: { $gte: new Date(departureDate) },
        isActive: true,
        type
      },
    },
    {
      $lookup: {
        from: "Route",
        localField: "routeId",
        foreignField: "_id",
        as: "route"
      },

    },
    {
      $unwind: "$route"
    },
    {
      $lookup: {
        from: "Station",
        localField: "route.startStationId",
        foreignField: "_id",
        as: "startStation"
      }
    },
    {
      $unwind: "$startStation"
    },
    {
      $lookup: {
        from: "Station",
        localField: "route.endStationId",
        foreignField: "_id",
        as: "endStation"
      }
    }, {
      $unwind: "$endStation"
    },
    {
      $match: {
        "startStation.zipCode": departureCity,
        "endStation.zipCode": arrivalCity
      }
    },
    {
      $lookup: {
        from: "Vehicle",
        localField: "vehicleType",
        foreignField: "_id",
        as: "vehicle"
      }
    },
    {
      $unwind: "$vehicle"
    },
    {
      $lookup: {
        from: "Carrier",
        localField: "vehicle.provider",
        foreignField: "_id",
        as: "carrier"
      }
    },
    {
      $unwind: "$carrier"
    },
    {
      $sort: {
        [sortBy]: sortDirection === "asc" ? 1 : -1,
      }
    },
    {
      $limit: +limit
    }
  ])
  return filterTrips
}

const updateOneTrip = async (_id, updateData) => {
  const updateObj = removeNullValueUpdate(updateData);
  const updatedTrip = await Trip.findOneAndUpdate({ _id }, updateObj, {
    new: true,
  });
  if (!updatedTrip) {
    throw new Error("Cập nhật chuyến đi không thành công.");
  }
  return updatedTrip;
};

const deleteTrip = async (_id) => {
  const deletedTrip = await Trip.findByIdAndUpdate(
    { _id },
    { isActive: false },
    { new: true }
  );
  if (!deletedTrip) {
    throw new Error(
      "Xóa chuyến đi không thành công. Chuyến đi không tìm thấy hoặc đã bị xóa."
    );
  }
  return deletedTrip;
};
const updateSeatNumberQuantity = async ({ tripId, quantity }) => {
  const query = {
    _id: tripId,
    isActive: true,
  };
  const updateObj = {
    $inc: {
      numberOfSeats: quantity,
    },
  };
  const option = {
    new: true,
  };
  return await Trip.findOneAndUpdate(query, updateObj, option);
};




module.exports = {
  createTrip,
  getOneTrip,
  getAllTrips,
  updateOneTrip,
  deleteTrip,
  searchTripsV2,
  searchTripsV3,
  updateSeatNumberQuantity,
};
