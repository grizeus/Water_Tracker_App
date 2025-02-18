import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instanceWater from "../api/api";
import type { Credentials, GeneralState } from "../redux.d.ts";

export const setToken = (token: string) => {
  instanceWater.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const unsetToken = () => {
  instanceWater.defaults.headers.common.Authorization = "";
};

export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post("/auth/signup", credentials);
      return data;
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error(`User with email - ${credentials.email}, already exist`);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const signInThunk = createAsyncThunk(
  "auth/signin",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const { data: wrap } = await instanceWater.post(
        "/auth/signin",
        credentials,
      );
      setToken(wrap.data.accessToken);
      return wrap.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error(`Email or password is wrong`);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const logOutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await instanceWater.post("/auth/logout");
      unsetToken();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const requestPassThunk = createAsyncThunk(
  "auth/request-pass",
  async (credentials: {email:string}, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post(
        "/auth/request-pass",
        credentials,
      );
      toast.success(
        `Password reset link has been sent to your email - ${credentials.email}`,
      );
      return data;
    } catch (error:any) {
      if (error.response.status === 404) {
        toast.error(`User ${credentials.email} not found`);
      }
      return rejectWithValue(error.message);
    }
  },
);
export const resetPassThunk = createAsyncThunk(
  "/auth/reset-pass",
  async (credentials:{password:string}, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post(
        "/auth/reset-pass",
        credentials,
      );
      return data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  },
);
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state: GeneralState = thunkAPI.getState() as GeneralState;
    const persistedToken = state.auth.token;
    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const { status, data: wrap } = await instanceWater.post("/auth/refresh");
      if (status === 200) {
        setToken(wrap.data.accessToken);
        const { data: user } = await instanceWater.get("/user");
        return user.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getUserThunk = createAsyncThunk(
  "/user",
  async (_, { rejectWithValue }) => {
    try {
      const { data: wrap } = await instanceWater.get("/user");
      return wrap.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
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
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(`Invalid file extension`);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const editUserInfoThunk = createAsyncThunk(
  "user",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.patch("/user", body);
      return data;
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error(`Current password is incorrect`);
      }
      return rejectWithValue(error.message);
    }
  },
);
