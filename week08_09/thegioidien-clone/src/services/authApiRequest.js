import axios from "axios";
import { API_URL } from "../constants/apiUrl";

import {
  registerStart,
  registerFailed,
  registerSuccess,
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

export const loginUser = async (account) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/login`, account);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
