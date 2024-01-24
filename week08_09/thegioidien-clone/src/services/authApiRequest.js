import axios from "axios";
import { API_URL } from "../constants/apiUrl";

import {
  registerStart,
  registerSuccess,
  registerFailed,
  loginStart,
  loginSuccess,
  loginFailed,
} from "../redux/features/authSlice";

export const registerUser = async (account, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post(`${API_URL}/api/v1/register`, account);
    dispatch(registerSuccess());
    navigate("/dangnhap");
  } catch (error) {
    dispatch(registerFailed());
  }
};

export const loginUser = async (account, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${API_URL}/api/v1/login`, account, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res.data));
    // navigate("/thanhvien");
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
  }
};
