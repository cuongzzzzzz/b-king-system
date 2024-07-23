const SuccessResponse = require("../cores/successResponse");
const {
  createVehicle,
  getOneVehicle,
  getAllVehicles,
  updateOneVehicle,
  deleteVehicle,
  getVehicleByCarrierId,
} = require("../services/vehicle.service");
const { removeNullValueUpdate } = require("../utils");

class VehicleController {
  createOne = async (req, res) => {
    const newVehicle = await createVehicle(req.body);
    return new SuccessResponse({
      message: "Tạo xe thành công!",
      metadata: newVehicle,
    }).send(res);
  };

  getOne = async (req, res) => {
    const _id = req.params.id;
    const foundVehicle = await getOneVehicle(_id);

    return new SuccessResponse({
      message: "Lấy thông tin xe thành công!",
      metadata: foundVehicle,
    }).send(res);
  };

  getAll = async (req, res) => {
    const vehicles = await getAllVehicles(req.query);
    return new SuccessResponse({
      message: "Lấy danh sách xe thành công!",
      metadata: vehicles,
    }).send(res);
  };

  updateOne = async (req, res) => {
    const _id = req.params.id;

    const updatedVehicle = await updateOneVehicle(_id, req.body);

    return new SuccessResponse({
      message: "Cập nhật xe thành công!",
      metadata: updatedVehicle,
    }).send(res);
  };

  deleteOne = async (req, res) => {
    const _id = req.params.id;
    const deletedVehicle = await deleteVehicle(_id);

    return new SuccessResponse({
      message: "Xóa xe thành công!",
      metadata: deletedVehicle,
    }).send(res);
  };
  getByCarrierid = async (req, res) => {
    const { id } = req.params
    return new SuccessResponse({
      message: "get xe thành công!",
      metadata: await getVehicleByCarrierId(id),
    }).send(res);
  }
}

module.exports = new VehicleController();
