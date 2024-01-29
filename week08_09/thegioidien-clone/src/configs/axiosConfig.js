import axios from "axios";
import { API_URL, USER_ACCESS_TOKEN_HEADER } from "../constants/apiUrl";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const currentUSer = JSON.parse(localStorage.getItem("currentUSer"));

    if (currentUSer && currentUSer.accessToken) {
      config.headers[USER_ACCESS_TOKEN_HEADER] = currentUSer.accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
