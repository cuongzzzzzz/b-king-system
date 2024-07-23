import { instance } from "@/configs/axios";

const login = async (data: any) => {
  try {
    const res = await instance.post("/login", data);
    return res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};
const register = async (data: any) => {
  try {
    const res = await instance.post("/register", data);
    return res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};

export { login, register };
