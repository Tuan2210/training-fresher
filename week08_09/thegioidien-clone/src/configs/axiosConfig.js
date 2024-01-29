import axios from "axios";
import {
  API_URL,
  REFRESH_TOKEN_URL,
  USER_ACCESS_TOKEN_HEADER,
  USER_REFRESH_TOKEN_HEADER,
} from "../constants/apiUrl";
import { store } from "../redux/store";

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
  // async function (error) {
  //   function updateReduxState() {
  //     const action = {
  //       type: "auth/clearUserData",
  //     };
  //     store.dispatch(action);
  //   }
  // },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const currentUSer = JSON.parse(localStorage.getItem("currentUSer"));
        const res = await axiosInstance.post(
          `${API_URL}/api/v1/${REFRESH_TOKEN_URL}`,
          null,
          {
            headers: {
              [USER_ACCESS_TOKEN_HEADER]: currentUSer.accessToken,
              [USER_REFRESH_TOKEN_HEADER]: currentUSer.refreshToken,
            },
          }
        );

        localStorage.setItem("currentUSer", JSON.stringify(res.data));

        error.config.headers[USER_ACCESS_TOKEN_HEADER] = res.data.accessToken;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
//
// axiosInstance.interceptors.response.use(
//   function (response) {
//      return response;
//   },
//   async function (error) {
//      function updateReduxState() {
//         const action = {
//            type: "auth/clearUserData",
//         };
//         store.dispatch(action);
//      }

//     //  const refreshToken = localStorage.getItem("refreshToken");
//     //  const accessToken = localStorage.getItem("accessToken");
//      const currentUSerInfo = JSON.parse(localStorage.getItem("currentUSer"));

//      if (refreshToken && !checkToken(refreshToken)) {
//         try {
//            updateReduxState();
//            console.log("đã đăng xuất");
//            window.open(routesConfig.signIn.path, "_self");
//         } catch (err) {
//            console.error("!!!!!httpRequest: ", err);
//         }
//      } else if (refreshToken && accessToken && checkToken(refreshToken) && !checkToken(accessToken)) {
//         try {
//            const res = await services.refreshTokenService();
//            if (res) {
//               localStorage.setItem("accessToken", res.data.accessToken);
//               localStorage.setItem("refreshToken", res.data.refreshToken);
//               console.log("đã refresh token");
//               return httpRequest(error.config);
//            }
//         } catch (error) {
//            console.error("!!!!!httpRequest: ", error);
//         }
//      } else if (!refreshToken || !accessToken) {
//         updateReduxState();
//      }
//      return Promise.reject(error);
//   },
// );

export default axiosInstance;
