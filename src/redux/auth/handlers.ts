import { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../redux.d.ts";
import { initialState } from "./slice.js";

export const handleGetUser = (state: AuthState, action: PayloadAction<any>) => {
  state.user = action.payload;
  state.isLoggedIn = true;
};

export const handleLogin = (state: AuthState, action: PayloadAction<any>) => {
  state.token = action.payload.accessToken;
  state.isLoggedIn = true;
};

export const handleLogout = () => initialState;

export const handleGetUserReject = (state: AuthState) => {
  state.isLoggedIn = false;
};

export const handleReqPass = () => initialState;

export const handleResPass = () => initialState;

export const handlerUpdateAvatar = (
  state: AuthState,
  action: PayloadAction<any>
) => {
  state.user.avatarURL = action.payload;
};

export const handlerEditUserInfo = (
  state: AuthState,
  action: PayloadAction<any>
) => {
  state.user = { ...state.user, ...action.payload.data };
};

export const handleRefreshPending = (state: AuthState) => {
  state.isRefreshing = true;
};

export const handleRefresh = (state: AuthState, action: PayloadAction<any>) => {
  state.user = action.payload;
  state.isRefreshing = false;
  state.isLoggedIn = true;
};

export const handleRefreshRejected = (state: AuthState) => {
  state.isRefreshing = false;
};
