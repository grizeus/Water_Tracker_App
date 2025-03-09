import { PayloadAction } from "@reduxjs/toolkit";
import type { LoadErorState } from "../../../types/redux";

export const handlePending = (state: LoadErorState) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (
  state: LoadErorState,
  action: PayloadAction<object>
) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const handleFulfilled = (state: LoadErorState) => {
  state.isLoading = false;
};
