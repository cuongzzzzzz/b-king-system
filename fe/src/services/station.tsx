import { instance } from "@/configs/axios";

export const getAllStation = async (params?: any) => {
  try {
    const res = await instance.get("/stations", { params });
    return res.data.metadata.data;
  } catch (error) {
    return [];
  }
};
export const getCityUnique = async (type?: string) => {
  try {
    if (!type) type = "bus"
    const res = await instance.get(`/stations/unique?type=${type}`);
    return res.data.metadata;
  } catch (error) {
    return []
  }
}
export const getOneStation = async (id: string) => {
  try {
    const res = await instance.get(`/stations/${id}`);
    return res.data.metadata.data;
  } catch (error) {
    console.log(error);
  }
};
