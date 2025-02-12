import { createSlice } from '@reduxjs/toolkit';
import {
  editUserInfoThunk,
  logInThunk,
  logOutThunk,
  getUserThunk,
  registerThunk,
  updateAvatarThunk,
  updateWaterRateThunk,
  reqPassThunk,
  resPassThunk,
  deleteUserThunk,
  refreshUser,
} from './authOperations';
import {
  handleLogin,
  handleLogout,
  handleGetUSerReject,
  handlerEditUserInfo,
  handlerUpdateAvatar,
  handlerUpdateWaterRate,
  handleReqPass,
  handleResPass,
  handleDeleteUser,
  handleGetUser,
} from './handlers';

export const initialState = {
  user: {
    email: '',
    avatarURL: '',
    name: '',
    gender: '',
    waterRate: '',
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, handleLogin)
      .addCase(logInThunk.fulfilled, handleLogin)
      .addCase(logOutThunk.fulfilled, handleLogout)
      .addCase(updateWaterRateThunk.fulfilled, handlerUpdateWaterRate)
      .addCase(updateAvatarThunk.fulfilled, handlerUpdateAvatar)
      .addCase(editUserInfoThunk.fulfilled, handlerEditUserInfo)
      .addCase(getUserThunk.fulfilled, handleGetUser)
      .addCase(getUserThunk.rejected, handleGetUSerReject)
      .addCase(reqPassThunk.fulfilled, handleReqPass)
      .addCase(resPassThunk.fulfilled, handleResPass)
      .addCase(deleteUserThunk.fulfilled, handleDeleteUser)
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
