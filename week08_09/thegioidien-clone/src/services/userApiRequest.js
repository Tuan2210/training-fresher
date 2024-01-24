import axios from "axios";
import { API_URL } from "../constants/apiUrl";

import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
} from "../redux/features/userSlice";

export const getUserLogined = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`${API_URL}/api/v1/users/user-info`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed());
  }
};
