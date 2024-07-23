import { instance } from "@/configs/axios";

export const searchTrip = async ({
  departureDate = "",
  departureStation = "",
  arrivalStation = "",
  limit = 5,
  page = 1,
  sortBy = "price",
  sortDirection = "asc",
  type="bus"
}) => {
  try {
    const res = await instance.get(
      `/trip/search?departureDate=${departureDate}&departureCity=${departureStation}&arrivalCity=${arrivalStation}&limit=${limit}&page=${page}&sortBy=${sortBy}&sortDirection=${sortDirection}&type=${type}`
    );
    return res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};
