const express = require("express");
const userController = require("../../controllers/user.controller"); 
const { asyncHandler } = require("../../utils"); 

const router = express.Router();

router.post("/register", asyncHandler(userController.createOne));

router.get("/:id", asyncHandler(userController.getOne));

router.patch("/:id", asyncHandler(userController.updateOne));

router.delete("/:id", asyncHandler(userController.deleteOne)); 

router.get("/", asyncHandler(userController.getAll)); 

module.exports = router;
