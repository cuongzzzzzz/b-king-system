const express = require("express");

const { asyncHandler } = require("../../utils");
const provinceController = require("../../controllers/province.controller");

const router = express.Router();

router.get("/", asyncHandler(provinceController.getAll));

module.exports = router;
