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

export const handleGetUserReject = state => {
  state.isLoggedIn = false;
};

export const handleReqPass = () => initialState;

export const handleResPass = () => initialState;

export const handlerUpdateAvatar = (state, { payload }) => {
  state.user.avatarURL = payload;
  state.isLoading = false;
};

export const handlerEditUserInfo = (state, { payload }) => {
  state.user = { ...state.user, ...payload.data };
};

export const handleRefreshPending = state => {
  state.isRefreshing = true;
};

export const handleRefresh = (state, { payload }) => {
  state.user = payload;
  state.isRefreshing = false;
  state.isLoggedIn = true;
};

export const handleRefreshRejected = state => {
  state.isRefreshing = false;
};