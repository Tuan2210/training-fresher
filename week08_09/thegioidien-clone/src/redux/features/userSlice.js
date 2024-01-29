import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      info: null,
      isFetching: false,
      error: false,
    },
    changePw: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    getUserStart: (state) => {
      state.currentUser.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.currentUser.isFetching = false;
      state.currentUser.info = action.payload;
    },
    getUserFailed: (state) => {
      state.currentUser.isFetching = false;
      state.currentUser.error = true;
    },
    //
    changePwStart: (state) => {
      state.changePw.isFetching = true;
    },
    changePwSuccess: (state) => {
      state.changePw.isFetching = false;
      state.changePw.success = true;
      state.changePw.error = false;
    },
    changePwFailed: (state) => {
      state.changePw.isFetching = false;
      state.changePw.success = false;
      state.changePw.error = true;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  changePwStart,
  changePwSuccess,
  changePwFailed,
} = userSlice.actions;

export default userSlice.reducer;
