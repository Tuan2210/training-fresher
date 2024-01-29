import axiosInstance from "../configs/axiosConfig";
import { API_URL, USER_ACCESS_TOKEN_HEADER } from "../constants/apiUrl";

import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  changePwStart,
  changePwSuccess,
  changePwFailed,
} from "../redux/features/userSlice";

export const getLoggedInUser = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axiosInstance.get(`${API_URL}/api/v1/users/user-info`, {
      headers: { [USER_ACCESS_TOKEN_HEADER]: accessToken },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed());
  }
};

export const changePw = async (
  oldPw,
  confirmNewPw,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(changePwStart());
  try {
    await axiosInstance.patch(
      `${API_URL}/api/v1/users/change-password`,
      {
        oldPassword: oldPw,
        newPassword: confirmNewPw,
      },
      {
        headers: { [USER_ACCESS_TOKEN_HEADER]: accessToken },
      }
    );
    dispatch(changePwSuccess());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUSer");

    navigate("/dangnhap");
  } catch (error) {
    console.log(error);
    dispatch(changePwFailed());
  }
};
