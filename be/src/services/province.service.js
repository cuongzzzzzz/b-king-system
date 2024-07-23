const provinceModel = require("../models/province.model")

class ProvinceService {
    async getALl() {
        const allProvinces = await provinceModel.find({}).lean()
        return allProvinces
    }
}

module.exports = new ProvinceService()