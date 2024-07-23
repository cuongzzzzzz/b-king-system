const SuccessResponse = require("../cores/successResponse");
const {
  createCarrier,
  getOneCarrier,
  getAllCarriers,
  updateOneCarrier,
  deleteCarrier,
} = require("../services/carrier.service");

class CarrierController {
  createOne = async (req, res) => {
    const newCarrier = await createCarrier(req.body);
    return new SuccessResponse({
      message: "Tạo nhà cung cấp vận tải thành công!",
      metadata: newCarrier,
    }).send(res);
  };

  getOne = async (req, res) => {
    const _id = req.params.id;
    const carrier = await getOneCarrier(_id);

    return new SuccessResponse({
      message: "Lấy thông tin nhà cung cấp vận tải thành công!",
      metadata: carrier,
    }).send(res);
  };

  getAll = async (req, res) => {
    const allCarriers = await getAllCarriers();
    return new SuccessResponse({
      message: "Lấy danh sách tất cả nhà cung cấp vận tải thành công!",
      metadata: allCarriers,
    }).send(res);
  };

  updateOne = async (req, res) => {
    const _id = req.params.id;
    const updatedCarrier = await updateOneCarrier(_id, req.body);
    return new SuccessResponse({
      message: "Cập nhật nhà cung cấp vận tải thành công!",
      metadata: updatedCarrier,
    }).send(res);
  };

  deleteOne = async (req, res) => {
    const _id = req.params.id;
    const deletedCarrier = await deleteCarrier(_id);

    return new SuccessResponse({
      message: "Xóa nhà cung cấp vận tải thành công!",
      metadata: deletedCarrier,
    }).send(res);
  };
}

module.exports = new CarrierController();
