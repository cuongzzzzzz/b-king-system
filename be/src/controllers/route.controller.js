const SuccessResponse = require("../cores/successResponse");

const {
  createRoute,
  getOneRoute,
  getAllRoutes,
  updateOneRoute,
  deleteRoute,
} = require("../services/route.service");

class RouteController {
  createOne = async (req, res) => {
    const newRoute = await createRoute(req.body);
    return new SuccessResponse({
      message: "Tạo tuyến đường thành công!",
      metadata: newRoute,
    }).send(res);
  };

  getOne = async (req, res) => {
    const _id = req.params.id;
    const route = await getOneRoute({ _id });

    return new SuccessResponse({
      message: "Lấy thông tin tuyến đường thành công!",
      metadata: route,
    }).send(res);
  };

  getAll = async (req, res) => {
    const allRoutes = await getAllRoutes(req.query);
    return new SuccessResponse({
      message: "Lấy danh sách tất cả tuyến đường thành công!",
      metadata: allRoutes,
    }).send(res);
  }






  updateOne = async (req, res) => {
    const _id = req.params.id;
    const updatedRoute = await updateOneRoute({ _id, ...req.body });

    return new SuccessResponse({
      message: "Cập nhật tuyến đường thành công!",
      metadata: updatedRoute,
    }).send(res);
  };

  deleteOne = async (req, res) => {
    const _id = req.params.id;
    const deletedRoute = await deleteRoute({ _id });

    return new SuccessResponse({
      message: "Xóa tuyến đường thành công!",
      metadata: deletedRoute,
    }).send(res);
  };
}

module.exports = new RouteController();
