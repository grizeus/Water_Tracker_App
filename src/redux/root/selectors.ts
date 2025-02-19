import type { GeneralState } from "../redux.d.ts";

export const selectIsLoading = (state: GeneralState) => state.root.isLoading;
