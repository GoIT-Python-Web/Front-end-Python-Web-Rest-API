import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/interfaces";
import {
  registerUser,
  loginUser,
  refreshUser,
  uploadUserPhoto,
} from "./operations";

export interface AuthState {
  user: IUser | null;
  token: string | null;
  userPic: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  userPic: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.token = action.payload.access_token as string;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(uploadUserPhoto.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.userPic = action.payload.photo_url;
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error = action.payload as string;
      });
  },
});

export const authReducer = authSlice.reducer;
