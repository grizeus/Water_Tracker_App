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
      .addMatcher(action => action.type.endsWith("/pending"), handlePending)
      .addMatcher(action => action.type.endsWith("/fulfilled"), handleFulfilled)
      .addMatcher(action => action.type.endsWith("/rejected"), handleRejected);
  },
});

export const rootReducer = slice.reducer;
