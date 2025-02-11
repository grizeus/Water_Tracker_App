import { initialState } from './authSlice';

export const handleRegister = (state, { payload }) => {

  state.token = payload.accessToken;


  state.isLoggedIn = true;
};

export const handleLogin = (state, { payload }) => {
  state.token = payload.accessToken;
  state.isLoggedIn = true;
};

export const handleLogout = () => initialState;

export const handleDeleteUser = () => initialState;

export const handleGetUserPending = state => {
  state.loggedIn = false;
};

export const handleGetUSerReject = state => {
  state.loggedIn = false;
};

export const handleReqPass = () => initialState;

export const handleResPass = () => initialState;

export const handlerUpdateWaterRate = (state, { payload }) => {
  state.user.waterRate = payload;
};

export const handlerUpdateAvatar = (state, { payload }) => {
  state.user.avatarURL = payload;
};

export const handlerEditUserInfo = (state, { payload }) => {
  state.user = { ...state.user, ...payload.data };
};
