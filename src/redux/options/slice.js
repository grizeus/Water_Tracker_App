import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'options',
  initialState: { theme: 'light' },
  reducers: {
    set: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { set } = slice.actions;
export const optionsReducer = slice.reducer;
