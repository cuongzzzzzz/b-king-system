const SuccessResponse = require("../cores/successResponse");
const {
  register,
  login,
  logOut,
  handleRefreshToken,
} = require("../services/access.service");

class UserController {
  login = async (req, res) => {
    const result = await login(req.body);
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 48 * 1000,
    });
    return new SuccessResponse({
      message: "dang nhap  thành công!",
      metadata: result,
    }).send(res);
  };
  register = async (req, res) => {
    return new SuccessResponse({
      message: "Dang ky thành công!",
      metadata: await register(req.body),
    }).send(res);
  };
  logOut = async (req, res) => {
    return new SuccessResponse({
      message: "Dang xuat dùng thành công!",
      metadata: await logOut(req),
    }).send(res);
  };
  handleRefreshToken = async (req, res) => {
    return new SuccessResponse({
      message: "Xóa người dùng thành công!",
      metadata: await handleRefreshToken(req),
    }).send(res);
  };
}

module.exports = new UserController();
