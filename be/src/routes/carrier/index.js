const express = require("express");
const carrierController = require("../../controllers/carrier.controller");
const { asyncHandler } = require("../../utils");
const { route } = require("../access");
const Carrier = require("../../models/carrier.model");
const router = express.Router();

const bcrypt = require("bcrypt");
const { ResourceNotFoundError } = require("../../cores/errorResponse");
const Booking = require("../../models/booking.model");
const { default: mongoose } = require("mongoose");

router.post("/", asyncHandler(carrierController.createOne));
router.post("/createMany", async (req, res) => {
    try {
        const body = req.body
        const data = body.map(carrier => {
            const hashPassword = bcrypt.hashSync(carrier.password, 10)
            carrier.password = hashPassword
            return carrier
        })
        await Carrier.create(data)
        return res.status(201).json("tao thanh cong")
    } catch (error) {
        console.log(error)
    }
})
router.get("/income-by-route/:id", async (req, res) => {
    try {
        const { id } = req.params
        const foundCarrier = await Carrier.findOne({ _id: id }).lean()
        if (!foundCarrier) throw ResourceNotFoundError("this carrier does not exist!")
        const routes = foundCarrier.routes

        const bookingFound = await Booking.aggregate([
            {
                $lookup: {
                    from: "Trip",
                    localField: "tripId",
                    foreignField: "_id",
                    as: "trip"

                }
            }, { $unwind: "$trip" },
            {
                $lookup: {
                    from: "Route",
                    localField: "trip.routeId",
                    foreignField: "_id",
                    as: "route"

                }
            }, { $unwind: "$route" },
            {
                $match: {
                    carrierId: new mongoose.Types.ObjectId(id)
                }
            },
             {
                $group: {
                    _id: "$route.name",  
                    total: { $sum: "$totalPrice" }  
                }
            }

        ])
        console.log(routes)
        return res.status(200).json(bookingFound)
    } catch (error) {
        console.log(error)
    }
})

router.get("/", asyncHandler(carrierController.getAll));

router.get("/:id", asyncHandler(carrierController.getOne));
router.patch("/:id", asyncHandler(carrierController.updateOne));
router.delete("/:id", asyncHandler(carrierController.deleteOne));

module.exports = router;
