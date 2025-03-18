import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instanceWater from "../api/api";
import type {
  AddEditWaterResponse,
  DailyWaterResponse,
  EntryData,
  MonthlyWaterResponse,
  NormaWaterResponse,
  EditWaterEntry,
} from "../../../types/global";
import axios from "axios";

export const addWaterThunk = createAsyncThunk(
  "water/addWater",
  async (newWater: Omit<EntryData, "_id">, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post<AddEditWaterResponse>(
        "/water/entry",
        newWater
      );
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.warning(`You must add from 50 ml to 5 L.`);
        }
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const editWaterThunk = createAsyncThunk(
  "water/editWater",
  async ({ id, amount, time }: EditWaterEntry, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.patch<AddEditWaterResponse>(
        `/water/entry/${id}`,
        {
          amount,
          time,
        }
      );
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.warning(`You must add from 50 ml to 5 L.`);
        }
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const updateWaterNormaThunk = createAsyncThunk(
  "water/daily-norma",
  async (dailyGoal: { dailyGoal: number }, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.patch<NormaWaterResponse>(
        "/water/daily-norma",
        dailyGoal
      );
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          toast.warning(`You must add from 500 ml to 15.0 L.`);
        }
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const deleteWaterThunk = createAsyncThunk(
  "water/deleteWater",
  async (id: string, { rejectWithValue }) => {
    try {
      await instanceWater.delete(`/water/entry/${id}`);
      return id;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const getTodayWater = createAsyncThunk(
  "water/getDayWater",
  async (_, { rejectWithValue }) => {
    try {
      const { data } =
        await instanceWater.get<DailyWaterResponse>("/water/today");
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const getMonthWater = createAsyncThunk(
  "water/getMonthWater",
  async (month: string, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.get<MonthlyWaterResponse>(
        `/water/month/${month}`
      );
      return { data: data.data, year: month.slice(0, 4) };
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);
