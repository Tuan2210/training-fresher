import axios from "axios";
import {
  API_URL,
  REFRESH_TOKEN_URL,
  USER_ACCESS_TOKEN_HEADER,
  USER_REFRESH_TOKEN_HEADER,
} from "../constants/apiUrl";

import {
  registerStart,
  registerSuccess,
  registerFailed,
  loginStart,
  loginSuccess,
  loginFailed,
  refreshAccessTokenStart,
  refreshAccessTokenSuccess,
  refreshAccessTokenFailed,
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

export const loginUser = async (
  account,
  dispatch,
  navigate,
  setLoginSuccess
) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${API_URL}/api/v1/login`, account, {
      withCredentials: true,
    });
    dispatch(loginSuccess(res.data));
    setLoginSuccess(true);

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("currentUSer", JSON.stringify(res.data));

    // navigate("/thanhvien");
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
    setLoginSuccess(false);
  }
};

export const refreshAccessToken = async (
  oldAccessToken,
  refreshToken,
  dispatch
) => {
  dispatch(refreshAccessTokenStart());
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/${REFRESH_TOKEN_URL}`,
      null,
      {
        headers: {
          [USER_ACCESS_TOKEN_HEADER]: oldAccessToken,
          [USER_REFRESH_TOKEN_HEADER]: refreshToken,
        },
      }
    );
    localStorage.setItem("currentUSer", JSON.stringify(res.data));

    dispatch(refreshAccessTokenSuccess(res.data));

    const currentUSer = JSON.parse(localStorage.getItem("currentUSer"));
    currentUSer.accessToken = res.data.accessToken;

    localStorage.setItem("currentUSer", JSON.stringify(currentUSer));
  } catch (error) {
    dispatch(refreshAccessTokenFailed());
  }
};
