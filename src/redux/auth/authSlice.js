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
} from './authOperations';
import {
  handleLogin,
  handleLogout,
  handleGetUSerReject,
  handlerEditUserInfo,
  handlerUpdateAvatar,
  handleReqPass,
  handleResPass,
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
      .addCase(signUpThunk.fulfilled, handleLogin)
      .addCase(signInThunk.fulfilled, handleLogin)
      .addCase(logOutThunk.fulfilled, handleLogout)
      .addCase(updateAvatarThunk.fulfilled, handlerUpdateAvatar)
      .addCase(editUserInfoThunk.fulfilled, handlerEditUserInfo)
      .addCase(getUserThunk.fulfilled, handleGetUser)
      .addCase(getUserThunk.rejected, handleGetUSerReject)
      .addCase(requestPassThunk.fulfilled, handleReqPass)
      .addCase(resetPassThunk.fulfilled, handleResPass)
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
