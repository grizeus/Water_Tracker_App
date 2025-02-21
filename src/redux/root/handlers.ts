import { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux";

export const handlePending = (state: RootState) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (state: RootState, action: PayloadAction<object>) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const handleFulfilled = (state: RootState) => {
  state.isLoading = false;
};
