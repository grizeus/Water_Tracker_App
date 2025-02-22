import type { RootState } from "../store";

export const selectIsLoading = (state: RootState) => state.root.isLoading;
