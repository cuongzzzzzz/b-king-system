import { instance } from "@/configs/axios"


export const getAllBookingByUserid = async () => {

    try {
        const res = await instance.get("/booking/get-all-booking")
        return res.data.metadata
    } catch (error: any) {
        console.log("error::", error?.message)
    }
}