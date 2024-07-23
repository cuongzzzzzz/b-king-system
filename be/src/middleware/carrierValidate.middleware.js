const { model } = require("mongoose")
const { BadRequestError } = require("../cores/errorResponse")
const Carrier = require("../models/carrier.model")

const carrierRequired = async (req, res, next) => {
    try {
        const { id } = req.user
        const foundCarrier = await Carrier.findOne({ _id: id })
        if (!foundCarrier) throw new BadRequestError("Ban khong co quyen thuc hien hanh dong nay")
        return next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = { carrierRequired }