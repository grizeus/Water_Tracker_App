import { initialState } from './authSlice';

export const handleGetUser = (state, { payload }) => {
  state.user = payload;
  state.isLoggedIn = true;
};

export const handleLogin = (state, { payload }) => {
  state.token = payload.accessToken;
  state.isLoggedIn = true;
};

export const handleLogout = () => initialState;

export const handleGetUSerReject = state => {
  state.isLoggedIn = false;
};

export const handleReqPass = () => initialState;

export const handleResPass = () => initialState;

export const handlerUpdateAvatar = (state, { payload }) => {
  state.user.avatarURL = payload;
};

export const handlerEditUserInfo = (state, { payload }) => {
  state.user = { ...state.user, ...payload.data };
};
