const express = require("express");
const stationController = require("../../controllers/station.controller");
const { asyncHandler } = require("../../utils");

const router = express.Router();

router.get("/unique", asyncHandler(stationController.getUniqueStations));
router.get("/query", asyncHandler(stationController.getAllStationsByQuery));
router.get("/", asyncHandler(stationController.getAll));
router.get("/:id", asyncHandler(stationController.getOne));
router.delete("/:id", asyncHandler(stationController.deleteOne));
router.patch("/:id", asyncHandler(stationController.updateOne));
router.post("/", asyncHandler(stationController.createOne));

module.exports = router;
