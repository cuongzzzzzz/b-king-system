const express = require("express");
const bookingController = require("../../controllers/booking.controller");
const { asyncHandler } = require("../../utils");
const { authentication } = require("../../middleware/authentication.middleware");

const router = express.Router();

router.post("/", asyncHandler(bookingController.createOne));
router.post("/checkexist", asyncHandler(bookingController.checkExist));
router.get("/get-all-booking", asyncHandler(authentication), asyncHandler(bookingController.getBookingByUser));

router.get("/", asyncHandler(bookingController.getAll));

router.get("/:id", asyncHandler(bookingController.getOne));
router.patch("/:id", asyncHandler(bookingController.updateOne));
router.delete("/:id", asyncHandler(bookingController.deleteOne));

module.exports = router;
