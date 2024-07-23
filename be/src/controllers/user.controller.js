const SuccessResponse = require("../cores/successResponse");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
} = require("../services/user.service");

class UserController {
  createOne = async (req, res) => {
    const newUser = await createUser(req.body);
    return new SuccessResponse({
      message: "Tạo người dùng thành công!", 
      metadata: newUser,
    }).send(res);
  };

  getOne = async (req, res) => {
    const _id = req.params.id;
    const foundUser = await getUserById(_id);

    return new SuccessResponse({
      message: "Lấy thông tin người dùng thành công!", 
      metadata: foundUser,
    }).send(res);
  };

  getAll = async (req, res) => {
    const users = await getAllUsers(req.query);
    return new SuccessResponse({
      message: "Lấy danh sách người dùng thành công!", 
      metadata: users,
    }).send(res);
  };

  updateOne = async (req, res) => {
    const _id = req.params.id;
    const updatedUser = await updateUserById(_id, req.body);

    return new SuccessResponse({
      message: "Cập nhật người dùng thành công!", 
      metadata: updatedUser,
    }).send(res);
  };

  deleteOne = async (req, res) => {
    const _id = req.params.id;
    const deletedUser = await deleteUserById(_id);

    return new SuccessResponse({
      message: "Xóa người dùng thành công!",
      metadata: deletedUser,
    }).send(res);
  };
}

module.exports = new UserController();
