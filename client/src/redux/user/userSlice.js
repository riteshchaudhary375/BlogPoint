import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutUserSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatePasswordSuccess: (state, action) => {
      // state.currentUser = action.payload;
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserProfileImageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserProfileImageSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserProfileImageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutUserSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
  updateUserProfileImageStart,
  updateUserProfileImageSuccess,
  updateUserProfileImageFailure,
} = userSlice.actions;

export default userSlice.reducer;
