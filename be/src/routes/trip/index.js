const express = require("express");
const tripController = require("../../controllers/trip.controller"); 
const { asyncHandler } = require("../../utils"); 

const router = express.Router();

router.post("/", asyncHandler(tripController.createOne));
router.get("/search", asyncHandler(tripController.search));

router.get("/", asyncHandler(tripController.getAll));

router.get("/:id", asyncHandler(tripController.getOne));

router.patch("/:id", asyncHandler(tripController.updateOne));

router.delete("/:id", asyncHandler(tripController.deleteOne));

module.exports = router;
