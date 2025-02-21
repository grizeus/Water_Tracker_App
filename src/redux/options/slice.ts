import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "options",
  initialState: { theme: "light" },
  reducers: {
    setTheme: (state, action: PayloadAction<{ theme: string }>) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setTheme } = slice.actions;
export const optionsReducer = slice.reducer;
