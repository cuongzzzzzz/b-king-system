const SuccessResponse = require("../cores/successResponse");
const {
  getOneBooking,
  getAllBookings,
  updateOneBooking,
  deleteBooking,
  createBookingV2,
  checkExistBooking,
  getBookingByUserId,
} = require("../services/booking.service");

class BookingController {
  createOne = async (req, res) => {
    const bookingInfo = req.body;
    console.log(bookingInfo);
    const newBooking = await createBookingV2({ bookingInfo });
    return new SuccessResponse({
      message: "Tạo đặt chỗ thành công!",
      metadata: newBooking,
    }).send(res);
  };

  getOne = async (req, res) => {
    const _id = req.params.id;
    const foundBooking = await getOneBooking(_id);

    return new SuccessResponse({
      message: "Lấy thông tin đặt chỗ thành công!",
      metadata: foundBooking,
    }).send(res);
  };

  getAll = async (req, res) => {
    const bookings = await getAllBookings(req.query);
    return new SuccessResponse({
      message: "Lấy danh sách đặt chỗ thành công!",
      metadata: bookings,
    }).send(res);
  };

  updateOne = async (req, res) => {
    const _id = req.params.id;
    const updatedBooking = await updateOneBooking(_id, req.body);

    return new SuccessResponse({
      message: "Cập nhật đặt chỗ thành công!",
      metadata: updatedBooking,
    }).send(res);
  };

  deleteOne = async (req, res) => {
    const _id = req.params.id;
    const deletedBooking = await deleteBooking(_id);

    return new SuccessResponse({
      message: "Xóa đặt chỗ thành công!",
      metadata: deletedBooking,
    }).send(res);
  };
  checkExist = async (req, res) => {
    return new SuccessResponse({
      message: "Xóa đặt chỗ thành công!",
      metadata: await checkExistBooking(req.body),
    }).send(res);
  };
  getBookingByUser = async (req, res) => {
    const userId = req?.user?.id;
    return new SuccessResponse({
      message: "Xóa đặt chỗ thành công!",
      metadata: await getBookingByUserId({ userId }),
    }).send(res);
  };
}

module.exports = new BookingController();
