import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, instance, setAuthHeader } from "../init";
import { IUser } from "../../interfaces/interfaces";
import { RootState } from "../store";

export const registerUser = createAsyncThunk<
  IUser,
  { username: string; email: string; password: string }
>("users/signup", async (credentials, { rejectWithValue }) => {
  try {
    console.log(credentials);
    const res = await instance.post("register", credentials);
    return res.data.user;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to register."));
  }
});

export const loginUser = createAsyncThunk<
  IUser,
  { username: string; password: string }
>("users/signin", async (credentials, { rejectWithValue }) => {
  try {
    const res = await instance.post("login", credentials);
    setAuthHeader(res.data.access_token);
    return res.data;
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to login."));
  }
});

export const refreshUser = createAsyncThunk<IUser, void, { state: RootState }>(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    try {
      setAuthHeader(persistedToken);
      const res = await instance.get("users/me");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        handleError(e, "Failed to refresh user.")
      );
    }
  }
);

export const uploadUserPhoto = createAsyncThunk<
  { photo_url: string },
  { file: File }
>("user/uploadPhoto", async ({ file }, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (!token) throw new Error("User is not authenticated");

    const formData = new FormData();
    formData.append("file", file);
    const res = await instance.post("/upload-photo", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return { photo_url: res.data.photo_url };
  } catch (e) {
    return rejectWithValue(handleError(e, "Failed to upload user image"));
  }
});
