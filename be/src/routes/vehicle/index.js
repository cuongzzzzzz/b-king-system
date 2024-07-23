const express = require("express");
const vehicleController = require("../../controllers/vehicle.controller");
const { asyncHandler } = require("../../utils");
const vehicleModel = require("../../models/vehicle.model");
const { carrierRequired } = require("../../middleware/carrierValidate.middleware");
const { authentication } = require("../../middleware/authentication.middleware");

const router = express.Router();

router.get("/", asyncHandler(vehicleController.getAll));
router.get("/carrier/:id", authentication, carrierRequired, asyncHandler(vehicleController.getByCarrierid));
router.post("/createMany", async (req, res) => {
    try {
        const data = req.body
        await vehicleModel.create(data)
        return res.status(200).json("tao thanh cong")
    } catch (error) {
        console.log(error)
    }
});
router.get("/:id", asyncHandler(vehicleController.getOne));
router.delete("/:id", asyncHandler(vehicleController.deleteOne));
router.patch("/:id", asyncHandler(vehicleController.updateOne));
router.post("/", asyncHandler(vehicleController.createOne));

module.exports = router;
