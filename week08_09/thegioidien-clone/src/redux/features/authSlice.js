import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    refreshAccessToken: {
      accessToken: null,
      isFetching: false,
      error: false,
    },
    logout: {
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    //register
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    //login
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    //refresh-accessToken
    refreshAccessTokenStart: (state) => {
      state.refreshAccessToken.isFetching = true;
    },
    refreshAccessTokenSuccess: (state, action) => {
      state.refreshAccessToken.isFetching = false;
      state.refreshAccessToken.accessToken = action.payload;
      state.refreshAccessToken.error = false;
    },
    refreshAccessTokenFailed: (state) => {
      state.refreshAccessToken.isFetching = false;
      state.refreshAccessToken.error = true;
    },
    //logout
    logoutStart: (state) => {
      state.login.isFetching = true;
    },

    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailed,
  loginStart,
  loginSuccess,
  loginFailed,
  refreshAccessTokenStart,
  refreshAccessTokenSuccess,
  refreshAccessTokenFailed,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
