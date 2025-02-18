import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instanceWater from "../api/api";

export const setToken = token => {
  instanceWater.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const unsetToken = () => {
  instanceWater.defaults.headers.common.Authorization = "";
};

export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post("/auth/signup", credentials);
      return data;
    } catch (error) {
      if (error.response.status === 409) {
        toast.error(`User with email - ${credentials.email}, already exist`);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const signInThunk = createAsyncThunk(
  "auth/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data: wrap } = await instanceWater.post(
        "/auth/signin",
        credentials
      );
      setToken(wrap.data.accessToken);
      return wrap.data;
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(`Email or password is wrong`);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await instanceWater.post("/auth/logout");
      unsetToken();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestPassThunk = createAsyncThunk(
  "auth/request-pass",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post(
        "/auth/request-pass",
        credentials
      );
      toast.success(
        `Password reset link has been sent to your email - ${credentials.email}`
      );
      return data;
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(`User ${credentials.email} not found`);
      }
      return rejectWithValue(error.message);
    }
  }
);
export const resetPassThunk = createAsyncThunk(
  "/auth/reset-pass",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post(
        "/auth/reset-pass",
        credentials
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      // setToken(persistedToken);
      const { data: wrap } = await instanceWater.post("/auth/refresh");
      setToken(wrap.data.accessToken);
      const { data: user } = await instanceWater.get("/user");
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserThunk = createAsyncThunk(
  "/user",
  async (_, { rejectWithValue }) => {
    try {
      const { data: wrap } = await instanceWater.get("/user");
      return wrap.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAvatarThunk = createAsyncThunk(
  "user/avatar",
  async (newPhotoFile, { rejectWithValue }) => {
    try {
      const {
        data: { avatarURL },
      } = await instanceWater.patch("/user/avatar", newPhotoFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return avatarURL;
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(`Invalid file extention`);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const editUserInfoThunk = createAsyncThunk(
  "user",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.patch("/user", body);
      return data;
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(`Current password is incorrect`);
      }
      return rejectWithValue(error.message);
    }
  }
);
