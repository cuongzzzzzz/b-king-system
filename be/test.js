const Carrier = require("./src/models/carrier.model");
const Station = require("./src/models/station.model");

const getUniqueStationDeparture = async () => {
    const stations = await Station.find({ isActive: true }).lean();
    if (!stations) throw new ResourceNotFound("Gặp lỗi khi lấy dữ liệu");
    let res = {}
    console.log(stations)
    stations.forEach((station) => {
        if (!res[station.city]) res[station.city] = 1
    })
    console.log(Object.keys(res))
    // return Object.keys(res)
    console.log("hehe")
};
// getUniqueStationDeparture()


const getTotalIncomeByRoute = async (carrierId) => {
    const routes = await Carrier.findOne({ _id: carrierId }).lean()
    console.log(routes)

    const pipeline = [
        {

        }
    ]
}
getTotalIncomeByRoute("668fbc2bc72ff5390d4cd677")