import { createSlice } from "@reduxjs/toolkit";
import { handleFulfilled, handlePending, handleRejected } from "./handlers";
import { RootState } from "../redux";

const initialState: RootState = {
  isLoading: false,
  error: null,
};

export const slice = createSlice({
  name: "root",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action: { type: string }) => action.type.endsWith("/pending"),
        handlePending
      )
      .addMatcher(
        (action: { type: string }) => action.type.endsWith("/fulfilled"),
        handleFulfilled
      )
      .addMatcher(
        (action: { type: string }) => action.type.endsWith("/rejected"),
        handleRejected
      );
  },
});

export const rootReducer = slice.reducer;
