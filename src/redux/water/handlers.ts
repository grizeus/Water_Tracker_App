import { format } from "date-fns";
import { PayloadAction } from "@reduxjs/toolkit";
import type { AddWaterResponse, EntryData, MonthData, WaterDataState } from "../redux";

interface DailyData {
  entries: EntryData[];
  dailyGoal: number;
  progress: string;
}

const handleProgress = (state: WaterDataState) => {
  const currentAmount = state.today.dailyWaterList.reduce(
    (acc, entry) => acc + entry.amount,
    0
  );
  const progress = parseInt(
    ((currentAmount / state.today.dailyGoal) * 100).toFixed(0)
  );

  state.today.progress = progress < 100 ? progress + "%" : "100%";
};

const updateMonthData = (state: WaterDataState) => {
  handleProgress(state);

  const today = new Date().toISOString().slice(0, 10);
  const dayToUpd = state.month.find(item => item.date === today);

  if (dayToUpd) {
    dayToUpd.percentage = state.today.progress;

    state.month = state.month.map(day =>
      day.date === dayToUpd.date ? dayToUpd : day
    );
  }
};

export const handlerAddWater = (
  state: WaterDataState,
  action: PayloadAction<AddWaterResponse>
) => {
  const data = action.payload.data;
  state.today.dailyWaterList.push(data);
  handleProgress(state);

  const today = new Date().toISOString().slice(0, 10);
  const dayToUpd = state.month.find(item => item.date === today);

  if (dayToUpd) {
    dayToUpd.entriesCount += 1;
    dayToUpd.percentage = state.today.progress;
  } else {
    state.month.push({
      date: today,
      dailyGoal: (state.today.dailyGoal / 1000).toFixed(1) + " L",
      percentage: state.today.progress,
      entriesCount: 1,
    });
    return;
  }

  state.month = state.month.map(day =>
    day.date === dayToUpd.date ? dayToUpd : day
  );
};

export const handleEditWater = (
  state: WaterDataState,
  action: PayloadAction<EntryData>
) => {
  const data = action.payload;
  const array = state.today.dailyWaterList;
  const idx = array.findIndex(item => item._id === data._id);

  if (idx !== -1) {
    array[idx] = data;
  }

  updateMonthData(state);
};

export const handlerDeleteWater = (
  state: WaterDataState,
  action: PayloadAction<string>
) => {
  const id = action.payload;
  state.today.dailyWaterList = state.today.dailyWaterList.filter(
    item => item._id !== id
  );

  handleProgress(state);

  const today = new Date().toISOString().slice(0, 10);
  if (state.today.dailyWaterList.length === 0) {
    state.month = state.month.filter(item => item.date !== today);
    return;
  }

  const dayToUpd = state.month.find(item => item.date === today);

  if (dayToUpd) {
    dayToUpd.entriesCount -= 1;
    dayToUpd.percentage = state.today.progress;

    state.month = state.month.map(day =>
      day.date === dayToUpd.date ? dayToUpd : day
    );
  }
};

export const handleGetTodayWater = (
  state: WaterDataState,
  action: PayloadAction<DailyData>
) => {
  const { entries, dailyGoal, progress } = action.payload;
  state.today.dailyWaterList = entries;
  state.today.dailyGoal = dailyGoal;
  state.today.progress = progress;
};

export const handlerUpdateNorma = (
  state: WaterDataState,
  action: PayloadAction<{ dailyGoal: number }>
) => {
  const dailyGoal = action.payload.dailyGoal;
  state.today.dailyGoal = dailyGoal;
  updateMonthData(state);
};

export const handleGetMonthWater = (
  state: WaterDataState,
  action: PayloadAction<{ data: MonthData[]; year: string }>
) => {
  const { data, year } = action.payload;
  state.month = data.map(item => ({
    ...item,
    date: format(`${year},${item.date}`, "yyyy-MM-dd"),
  }));
};
