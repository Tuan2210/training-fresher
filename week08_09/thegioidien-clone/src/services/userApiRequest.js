import axiosInstance from "../configs/axiosConfig";
import { API_URL, USER_ACCESS_TOKEN_HEADER } from "../constants/apiUrl";

import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  changePwStart,
  changePwSuccess,
  changePwFailed,
  updateContactStart,
  updateContactSuccess,
  updateContactFailed,
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
  dataObj,
  accessToken,
  dispatch,
  navigate,
  setMsgChangePw
) => {
  dispatch(changePwStart());
  try {
    await axiosInstance.patch(
      `${API_URL}/api/v1/users/change-password`,
      dataObj,
      {
        headers: { [USER_ACCESS_TOKEN_HEADER]: accessToken },
      }
    );
    dispatch(changePwSuccess());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUSer");

    navigate("/dangnhap");
    setMsgChangePw("");
  } catch (error) {
    dispatch(changePwFailed());
    setMsgChangePw("Đổi mật khẩu thất bại, vui lòng thử lại!");
  }
};

export const updateContactInfo = async (
  contactInfo,
  accessToken,
  dispatch,
  setIsUpdateContactForm,
  navigate,
  setUpdateContactMsg
) => {
  dispatch(updateContactStart());
  try {
    await axiosInstance.put(
      `${API_URL}/api/v1/users/contact-info`,
      contactInfo,
      {
        headers: { [USER_ACCESS_TOKEN_HEADER]: accessToken },
      }
    );
    dispatch(updateContactSuccess());
    setIsUpdateContactForm(false);
    navigate("/");
  } catch (error) {
    dispatch(updateContactFailed());
    setIsUpdateContactForm(true);

    if (error.response.data.status === 400)
      setUpdateContactMsg("Số điện thoại đã được đăng ký!");
  }
};
