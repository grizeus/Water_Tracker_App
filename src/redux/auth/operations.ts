import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instanceWater from "../api/api";
import type {
  Credentials,
  GetUserResponse,
  PersistedUser,
  SignUpInResponse,
  UpdAvatarResponse,
  UpdUserReq,
} from "../redux.d.ts";
import axios from "axios";
import type { RootState } from "../store";

interface intermediateData {
  user: string;
  token: string;
  _persist: string;
}

const getPersistedUser = (jsonString: string | null): PersistedUser | null => {
  if (!jsonString) {
    return null;
  }
  try {
    const parsedData = JSON.parse(jsonString) as intermediateData;
    if (parsedData) {
      return JSON.parse(parsedData.user) as PersistedUser;
    }
  } catch (error) {
    console.error("JSON parsing failed:", error);
    return null;
  }
  return null;
};

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
      const { data } = await instanceWater.post<SignUpInResponse>(
        "/auth/signup",
        credentials,
      );
      setToken(data.data.accessToken);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          toast.error(`User with email ${credentials.email} already exist`);
        }
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const signInThunk = createAsyncThunk(
  "auth/signin",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post<SignUpInResponse>(
        "/auth/signin",
        credentials,
      );
      setToken(data.data.accessToken);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          toast.error(`Email or password is wrong`);
        }
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const logOutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await instanceWater.post("/auth/logout");
      unsetToken();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const persistedToken = state.auth.token;
    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const { status, data: wrap } =
        await instanceWater.post<SignUpInResponse>("/auth/refresh");
      if (status === 200) {
        setToken(wrap.data.accessToken);
        const rawData = localStorage.getItem("persist:auth");
        if (rawData) {
          const persistedUser = getPersistedUser(rawData);
          if (persistedUser) {
            return persistedUser;
          }
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const getUserThunk = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.get<GetUserResponse>("/user");
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const updateAvatarThunk = createAsyncThunk(
  "auth/avatar",
  async (newPhotoFile: string, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.patch<UpdAvatarResponse>(
        "/user/avatar",
        newPhotoFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.error(`Invalid file extension`);
        }
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  },
);

export const updateUserInfoThunk = createAsyncThunk(
  "auth/edit",
  async (updInfo: UpdUserReq, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.patch<GetUserResponse>("/user", updInfo);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          toast.error(`Current password is incorrect`);
        }
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  },
);
