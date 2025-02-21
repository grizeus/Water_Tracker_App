import { PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthState,
  GetUserResponse,
  PersistedUser,
  SignUpInResponse,
  UpdAvatarResponse,
} from "../redux.d.ts";

export const initialState: AuthState = {
  user: {
    email: null,
    avatarURL: null,
    name: null,
    gender: null,
    dailyGoal: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

export const handleGetUser = (
  state: AuthState,
  action: PayloadAction<GetUserResponse>
) => {
  const userInfo = action.payload.data;
  state.user = { avatarURL: userInfo.avatarURL ?? null, ...userInfo };
  state.isLoggedIn = true;
};

export const handleLogin = (
  state: AuthState,
  action: PayloadAction<SignUpInResponse>
) => {
  state.token = action.payload.data.accessToken;
  state.isLoggedIn = true;
};

export const handleLogout = () => initialState;

export const handleGetUserReject = (state: AuthState) => {
  state.isLoggedIn = false;
};

export const handlerUpdateAvatar = (
  state: AuthState,
  action: PayloadAction<UpdAvatarResponse>
) => {
  state.user.avatarURL = action.payload.avatarURL;
};

export const handlerEditUserInfo = (
  state: AuthState,
  action: PayloadAction<GetUserResponse | undefined>
) => {
  if (action.payload) {
    const userInfo = action.payload.data;
    state.user = {
      avatarURL: state.user.avatarURL
        ? (userInfo.avatarURL ?? state.user.avatarURL)
        : (userInfo.avatarURL ?? null),
      ...userInfo,
    };
  }
};

export const handleRefreshPending = (state: AuthState) => {
  state.isRefreshing = true;
};

export const handleUserRefresh = (
  state: AuthState,
  action: PayloadAction<PersistedUser | undefined>
) => {
  if (action.payload) {
    state.user = action.payload;
    state.isRefreshing = false;
    state.isLoggedIn = true;
  }
};

export const handleUserRefreshRejected = (state: AuthState) => {
  state.isRefreshing = false;
};
