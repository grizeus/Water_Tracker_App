import type { RootState } from "../store";

export const selectWaterToday = (state: RootState) =>
  state.waterData.today.dailyWaterList;
export const selectMonthData = (state: RootState) => state.waterData.month;
export const selectDailyGoal = (state: RootState) => state.waterData.today.dailyGoal;
export const selectProgress = (state: RootState) => state.waterData.today.progress;
