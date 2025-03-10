import { createSlice } from "@reduxjs/toolkit";
import {
  handleEditWater,
  handleGetMonthWater,
  handleGetTodayWater,
  handlerAddWater,
  handlerDeleteWater,
  handlerUpdateNorma,
} from "./handlers";
import {
  addWaterThunk,
  deleteWaterThunk,
  editWaterThunk,
  getMonthWater,
  getTodayWater,
  updateWaterNormaThunk,
} from "./operations";
import { WaterDataState } from "../../../types/redux";

const initialState: WaterDataState = {
  month: [],
  today: {
    dailyWaterList: [],
    dailyGoal: 2000,
    progress: "0%",
  },
};

const slice = createSlice({
  name: "water",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addWaterThunk.fulfilled, handlerAddWater)
      .addCase(editWaterThunk.fulfilled, handleEditWater)
      .addCase(deleteWaterThunk.fulfilled, handlerDeleteWater)
      .addCase(getTodayWater.fulfilled, handleGetTodayWater)
      .addCase(getMonthWater.fulfilled, handleGetMonthWater)
      .addCase(updateWaterNormaThunk.fulfilled, handlerUpdateNorma);
  },
});

export const waterReducer = slice.reducer;
