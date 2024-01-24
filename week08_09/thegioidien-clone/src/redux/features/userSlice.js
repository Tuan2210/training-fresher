import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      info: null,
      isFetching: false,
      error: false,
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
  },
});

export const { getUserStart, getUserSuccess, getUserFailed } =
  userSlice.actions;

export default userSlice.reducer;
