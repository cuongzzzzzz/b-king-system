const express = require("express");

const { asyncHandler } = require("../../utils");
const { momo } = require("../../services/momo.service");

const router = express.Router();

router.post("/", asyncHandler(momo));

module.exports = router;
