import type { RootState } from "../redux";

export const selectIsLoading = (state: RootState) => state.isLoading;
