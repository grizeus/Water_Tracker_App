import { createSlice } from "@reduxjs/toolkit";
import {
  updateUserInfoThunk,
  signInThunk,
  logOutThunk,
  getUserThunk,
  signUpThunk,
  updateAvatarThunk,
  refreshUserThunk,
} from "./operations";
import {
  handleLogin,
  handleLogout,
  handleGetUserReject,
  handlerEditUserInfo,
  handleUpdateAvatarPending,
  handleUpdateAvatar,
  handleUpdateAvatarRejected,
  handleGetUser,
  handleUserRefresh,
  handleRefreshPending,
  handleUserRefreshRejected,
  initialState,
} from "./handlers";

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signUpThunk.fulfilled, handleLogin)
      .addCase(signInThunk.fulfilled, handleLogin)
      .addCase(logOutThunk.fulfilled, handleLogout)
      .addCase(updateAvatarThunk.pending, handleUpdateAvatarPending)
      .addCase(updateAvatarThunk.fulfilled, handleUpdateAvatar)
      .addCase(updateAvatarThunk.rejected, handleUpdateAvatarRejected)
      .addCase(updateUserInfoThunk.fulfilled, handlerEditUserInfo)
      .addCase(getUserThunk.fulfilled, handleGetUser)
      .addCase(getUserThunk.rejected, handleGetUserReject)
      .addCase(refreshUserThunk.pending, handleRefreshPending)
      .addCase(refreshUserThunk.fulfilled, handleUserRefresh)
      .addCase(refreshUserThunk.rejected, handleUserRefreshRejected);
  },
});

export const authReducer = slice.reducer;
