const express = require("express");
const routeController = require("../../controllers/route.controller"); 
const { asyncHandler } = require("../../utils"); 

const router = express.Router();

router.post("/", asyncHandler(routeController.createOne)); 

router.get("/", asyncHandler(routeController.getAll)); 

router.get("/:id", asyncHandler(routeController.getOne));
router.patch("/:id", asyncHandler(routeController.updateOne));
router.delete("/:id", asyncHandler(routeController.deleteOne));

module.exports = router;
