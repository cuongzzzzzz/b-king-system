const SuccessResponse = require("../cores/successResponse");
const {
  createTrip,
  getOneTrip,
  getAllTrips,
  updateOneTrip,
  deleteTrip,
  searchTrips,
  searchTripsV2,
  searchTripsV3,
} = require("../services/trip.service");

class TripController {
  createOne = async (req, res) => {
    const newTrip = await createTrip(req.body);
    return new SuccessResponse({
      message: "Tạo chuyến đi thành công!",
      metadata: newTrip,
    }).send(res);
  };

  getOne = async (req, res) => {
    const _id = req.params.id;
    const foundTrip = await getOneTrip(_id);

    return new SuccessResponse({
      message: "Lấy thông tin chuyến đi thành công!",
      metadata: foundTrip,
    }).send(res);
  };

  getAll = async (req, res) => {
    const trips = await getAllTrips(req.query);
    return new SuccessResponse({
      message: "Lấy danh sách chuyến đi thành công!",
      metadata: trips,
    }).send(res);
  };

  updateOne = async (req, res) => {
    const _id = req.params.id;
    const updatedTrip = await updateOneTrip(_id, req.body);

    return new SuccessResponse({
      message: "Cập nhật chuyến đi thành công!",
      metadata: updatedTrip,
    }).send(res);
  };

  deleteOne = async (req, res) => {
    const _id = req.params.id;
    const deletedTrip = await deleteTrip(_id);

    return new SuccessResponse({
      message: "Xóa chuyến đi thành công!",
      metadata: deletedTrip,
    }).send(res);
  };
  search = async (req, res) => {
    const searchTrip = await searchTripsV3(req.query);

    return new SuccessResponse({
      message: "Tìm chuyến đi thành công!",
      metadata: searchTrip,
    }).send(res);
  };
}

module.exports = new TripController();
