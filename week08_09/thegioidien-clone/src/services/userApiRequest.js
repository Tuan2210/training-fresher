import axios from "axios";
import { API_URL, USER_ACCESS_TOKEN_HEADER } from "../constants/apiUrl";

import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
} from "../redux/features/userSlice";

export const getLoggedInUser = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`${API_URL}/api/v1/users/user-info`, {
      headers: { [USER_ACCESS_TOKEN_HEADER]: accessToken },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed());
  }
};
