import type { GeneralState } from "../redux.d.ts";

export const selectWaterToday = (state: GeneralState) =>
  state.waterData.today.dailyWaterList;
export const selectMonthData = (state: GeneralState) => state.waterData.month;
export const selectDailyGoal = (state: GeneralState) => state.waterData.today.dailyGoal;
export const selectProgress = (state: GeneralState) => state.waterData.today.progress;
