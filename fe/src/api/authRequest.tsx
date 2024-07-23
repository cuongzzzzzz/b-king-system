// @ts-nocheck
import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../redux/authSlice";
import { toast } from "react-toastify";

//npm install axios

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/api/login", user);
    dispatch(loginSuccess(res.data.metadata));
    toast("Dang nhap thanh cong");

    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
    console.log(err)
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8000/api/register", user);
    dispatch(registerSuccess());
    toast("Dang ky thanh cong");

    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const logOut = async (dispatch, navigate, axiosJWT) => {
  dispatch(logOutStart());
  try {
    // await axiosJWT.post("/logout", {});
    dispatch(logOutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};
