const { default: mongoose } = require("mongoose");
const { ConflictError, ResourceNotFoundError } = require("../cores/errorResponse");
const Booking = require("../models/booking.model");
const Trip = require("../models/trip.model");
const User = require("../models/user.model");
const { updateOneTrip, updateSeatNumberQuantity } = require("./trip.service");

const createBooking = async (bookingData) => {
  console.log(bookingData)
  const requiredFields = [
    "tripId",
    "passengerName",
    "phoneNumber",
    "email",
    "numberOfTickets",
    "totalPrice",
    "paymentMethod",
    "carrierId"
  ];
  const {
    tripId,
    userId,
    passengerName,
    phoneNumber,
    email,
    numberOfTickets,
    totalPrice,
    paymentMethod,
    carrierId
  } = bookingData;
  const missingFields = requiredFields.filter((field) => !bookingData[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `Thông tin đặt chỗ bắt buộc thiếu: ${missingFields.join(", ")}`
    );
  }

  const trip = await Trip.findById(bookingData.tripId);
  if (!trip) {
    throw new ResourceNotFoundError("Chuyến đi không tìm thấy!");
  }
  if (trip.numberOfSeats - bookingData.numberOfTickets < 0) {
    throw new ConflictError("Số lượng vé đặt vượt quá số ghế trống!");
  }

  const newBooking = await Booking.create({
    tripId,
    numberOfTickets,
    paymentMethod,
    carrierId
  });
  return newBooking;
};

const getOneBooking = async (_id) => {
  const foundBooking = await Booking.findById(_id)
    .populate("tripId")
    .populate("userId");
  if (!foundBooking) {
    throw new ResourceNotFoundError("Đặt chỗ không tìm thấy!");
  }
  return foundBooking;
};

const getBookingByUserId = async ({ userId }) => {
  const foundUser = await User.findOne({ _id: userId });
  console.log(userId);
  // console.log(userId)
  // if (!foundUser) throw new ResourceNotFoundError("Nguoi dung khong ton tai");
  // const allBooking = await Booking.find({ userId });

  const pipeLine = [
    {
      $lookup: {
        from: "Trip",
        localField: "tripId",
        foreignField: "_id",
        as: "trip"
      }
    }, {
      $unwind: "$trip"
    }, {
      $lookup: {
        from: "Route",
        localField: "trip.routeId",
        foreignField: "_id",
        as: "route"
      }
    }, {
      $unwind: "$route"
    },
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup: {
        from: "Station",
        localField: "route.startStationId",
        foreignField: "_id",
        as: "startStation"
      }
    }, {
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
      $lookup: {
        from: "Vehicle",
        localField: "trip.vehicleType",
        foreignField: "_id",
        as: "vehicle"
      }
    }, {
      $unwind: "$vehicle"
    },
    {
      $lookup: {
        from: "Carrier",
        localField: "vehicle.provider",
        foreignField: "_id",
        as: "provider"
      }
    }, {
      $unwind: "$provider"
    },
  ]

  const res = await Booking.aggregate(pipeLine)

  return res;
};

const getBookingByUserIdV2 = async ({ userId }) => {
  const foundUser = await User.findOne({ _id: userId });
  if (!foundUser) throw new ResourceNotFoundError("Nguoi dung khong ton tai");

  const pipeLine = [
    {
      $lookup: {
        from: "Trip",
        localField: "tripId",
        foreignField: "_id",
        as: "trip"
      }
    }
  ]

  const res = await Booking.aggregate(pipeLine)


}

const getAllBookings = async (filter = {}) => {
  const bookingFilters = {};

  if (filter.userId) {
    bookingFilters.userId = filter.userId;
  }

  if (filter.status) {
    bookingFilters.status = filter.status;
  }

  if (filter.createdAtFrom && filter.createdAtTo) {
    bookingFilters.createdAt = {
      $gte: filter.createdAtFrom,
      $lte: filter.createdAtTo,
    };
  }

  if (filter.tripRoute || filter.departureDateFrom || filter.departureDateTo) {
    const tripFilters = {};
    if (filter.tripRoute) {
      tripFilters.routeId = filter.tripRoute;
    }
    if (filter.departureDateFrom && filter.departureDateTo) {
      tripFilters.departureDate = {
        $gte: filter.departureDateFrom,
        $lte: filter.departureDateTo,
      };
    }
    bookingFilters.tripId = { $in: await Trip.find(tripFilters).select("_id") };
  }

  const bookings = await Booking.find(bookingFilters)
    .populate("tripId")
    .populate("userId");
  return bookings;
};

const updateOneBooking = async (_id, updateData) => {
  const updateObject = removeNullValueUpdate(updateData);
  const updatedBooking = await Booking.findByIdAndUpdate(_id, updateObject, {
    new: true,
  });
  if (!updatedBooking) {
    throw new ConflictError("Failed to update");
  }
  return updatedBooking;
};

const deleteBooking = async (_id) => {
  const deletedBooking = await Booking.findByIdAndUpdate(
    _id,
    { isActive: false },
    { new: true }
  );
  if (!deletedBooking) {
    throw new ResourceNotFoundError("this booking is not found");
  }
  return deletedBooking;
};

const createBookingV2 = async ({ bookingInfo }) => {
  const {
    numberOfTickets,
    bookingCode,
    userId,
    tripId,
    totalPrice,
    paymentMethod,
    notes = "",
    passengerName,
    phoneNumber,
    address,
    email,
    carrierId
  } = bookingInfo;
  console.log(bookingInfo);
  const foundBooking = await Booking.findOne({ bookingCode });
  console.log(foundBooking);
  if (foundBooking) throw new ConflictError("Booking code da ton tai");
  const foundTrip = await Trip.findOne({ _id: tripId });
  if (!foundTrip) throw new ResourceNotFoundError("Trip doesnt exist");
  //check seat is enough
  const { numberOfSeats } = foundTrip;
  console.log(userId);

  if (numberOfTickets > numberOfSeats)
    throw new ConflictError(
      "this trip is not enough seat. please adjust number of ticket or choose another trip "
    );

  if (userId) {
    const foundUser = await User.findOne({
      _id: userId,
    });
    if (!foundUser) throw new ResourceNotFoundError("Nguoi dung khong ton tai");
    //check trip
    if (userId == carrierId) throw new ConflictError("You cant order this trip!")
    const { username, email, phoneNumber, address } = foundUser;
    //creat booking
    const newBooking = await Booking.create({
      bookingCode,
      passengerName: username,
      userId,
      phoneNumber,
      address,
      email,
      numberOfTickets,
      totalPrice,
      paymentMethod,
      notes,
      tripId,
      carrierId

    });
    //decrease number of seat
    await updateSeatNumberQuantity({
      tripId,
      quantity: -numberOfTickets,
    });
    if (!newBooking) throw new ConflictError("booking khong thanh cong");
    return newBooking;
  }

  const newBooking = await Booking.create({
    numberOfTickets,
    bookingCode,
    tripId,
    totalPrice,
    paymentMethod,
    notes,
    passengerName,
    phoneNumber,
    address,
    email,
    gest: {
      passengerName,
      phoneNumber,
      address,
      email,
    },
  });
  console.log(numberOfTickets);
  await updateSeatNumberQuantity({
    tripId,
    quantity: -numberOfTickets,
  });

  return newBooking;
};

const checkExistBooking = async ({ bookingCode }) => {
  const foundTrip = await Booking.findOne({ bookingCode });
  if (foundTrip) throw new ConflictError("Ban da booking roi");
  return { isBooking: false };
};

module.exports = {
  createBooking,
  getOneBooking,
  getAllBookings,
  updateOneBooking,
  deleteBooking,
  createBookingV2,
  checkExistBooking,
  getBookingByUserId,
};
