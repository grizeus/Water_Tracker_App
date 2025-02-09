export const selectWaterToday = state => state.waterData.today;
export const selectMonthData = state => state.waterData.month;

export const selectDailyNormFulfillment = state =>
  state.waterData.today.dailyGoal;

export const selectWaterRate = state => state.auth.user.waterRate;

export const selectWaterVolumePercentage = state => state.waterData.today.progress;
