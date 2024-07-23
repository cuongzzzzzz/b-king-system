const SuccessRespone = require("../cores/successResponse");
const {
  createStation,
  getOneStation,
  updateOneStation,
  getAllStations,
  deleteStation,
  getUniqueStation,
  getAllStationsByQuery,
} = require("../services/station.service");

class StationController {
  createOne = async (req, res) => {
    return new SuccessRespone({
      message: "Tao ga thanh cong!",
      metadata: await createStation(req.body),
    }).send(res);
  };
  getOne = async (req, res) => {
    const _id = req.params.id;
    return new SuccessRespone({
      message: "get ga thanh cong!",
      metadata: await getOneStation({ _id }),
    }).send(res);
  };
  getAll = async (req, res) => {
    return new SuccessRespone({
      message: "Get tat ca ga thanh cong!",
      metadata: await getAllStations(req.query),
    }).send(res);
  };
  updateOne = async (req, res) => {
    return new SuccessRespone({
      message: "cap nhat ga thanh cong!",
      metadata: await updateOneStation(req.params.id, req.body),
    }).send(res);
  };
  deleteOne = async (req, res) => {
    const _id = req.params.id;

    return new SuccessRespone({
      message: "xoa ga thanh cong!",
      metadata: await deleteStation({ _id }),
    }).send(res);
  };
  getUniqueStations = async (req, res) => {
    const { type } = req.query

    return new SuccessRespone({
      message: "lay thanh pho thanh cong!",
      metadata: await getUniqueStation({ type }),
    }).send(res);
  };
  getAllStationsByQuery = async (req, res) => {

    return new SuccessRespone({
      message: "lay thanh pho thanh cong!",
      metadata: await getAllStationsByQuery(req.query),
    }).send(res);
  };
}

module.exports = new StationController();
