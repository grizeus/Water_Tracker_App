import type { GeneralState } from "../redux.d.ts";

export const selectUser = (state: GeneralState) => state.auth.user;
export const selectIsLoggedIn = (state: GeneralState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: GeneralState) =>
  state.auth.isRefreshing;
export const selectDaily = (state: GeneralState) => state.auth.user.dailyGoal;
