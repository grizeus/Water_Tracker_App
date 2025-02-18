import { createSlice } from '@reduxjs/toolkit';
import {
  editUserInfoThunk,
  signInThunk,
  logOutThunk,
  getUserThunk,
  signUpThunk,
  updateAvatarThunk,
  requestPassThunk,
  resetPassThunk,
  refreshUser,
} from './operations.js';
import {
  handleLogin,
  handleLogout,
  handleGetUserReject,
  handlerEditUserInfo,
  handlerUpdateAvatar,
  handleReqPass,
  handleResPass,
  handleGetUser,
  handleRefresh,
  handleRefreshPending,
  handleRefreshRejected,
} from "./handlers";

export const initialState = {
  user: {
    email: null,
    avatarURL: null,
    name: null,
    gender: null,
    waterRate: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpThunk.fulfilled, handleLogin)
      .addCase(signInThunk.fulfilled, handleLogin)
      .addCase(logOutThunk.fulfilled, handleLogout)
      .addCase(updateAvatarThunk.fulfilled, handlerUpdateAvatar)
      .addCase(editUserInfoThunk.fulfilled, handlerEditUserInfo)
      .addCase(getUserThunk.fulfilled, handleGetUser)
      .addCase(getUserThunk.rejected, handleGetUserReject)
      .addCase(requestPassThunk.fulfilled, handleReqPass)
      .addCase(resetPassThunk.fulfilled, handleResPass)
      .addCase(refreshUser.pending, handleRefreshPending)
      .addCase(refreshUser.fulfilled, handleRefresh)
      .addCase(refreshUser.rejected, handleRefreshRejected);
  },
});

export const authReducer = slice.reducer;
