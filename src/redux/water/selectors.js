export const selectWaterToday = state => state.waterData.today;
export const selectMonthData = state => state.waterData.month;

export const selectDailyGoal = state =>
  state.waterData.today.dailyGoal;

export const selectWaterVolumePercentage = state => state.waterData.today.progress;
