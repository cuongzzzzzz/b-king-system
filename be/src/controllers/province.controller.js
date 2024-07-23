const SuccessRespone = require("../cores/successResponse");
const provinceService = require("../services/province.service");
const {

} = require("../services/province.service");

class ProvinceController {
    async getAll(req, res) {
        return new SuccessRespone({
            message: "Lay danh sach tinh thanh cong",
            metadata: await provinceService.getALl()
        }).send(res)
    }
}

module.exports = new ProvinceController();
