import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instanceWater from "../api/api";
import type { AddWaterResponse, EntryData } from "../redux.d.ts";
import axios from "axios";

interface EditWaterEntry {
  id: string;
  amount: number;
  time: number;
}

export const addWaterThunk = createAsyncThunk(
  "water/addWater",
  async (newWater: EntryData, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.post<AddWaterResponse>(
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
      const { data: wrap } = await instanceWater.patch(`/water/entry/${id}`, {
        amount,
        time,
      });
      return wrap.data;
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.warning(`You must add from 50 ml to 5.0 L.`);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateWaterNormaThunk = createAsyncThunk(
  "water/daily-norma",
  async (dailyGoal, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.patch(
        "/water/daily-norma",
        dailyGoal
      );
      return data;
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.warning(`You must add from 500 ml to 15.0 L.`);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWaterThunk = createAsyncThunk(
  "water/deleteWater",
  async (id: string, { rejectWithValue }) => {
    try {
      await instanceWater.delete(`/water/entry/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTodayWater = createAsyncThunk(
  "water/getDayWater",
  async (_, { rejectWithValue }) => {
    try {
      const { data: wrap } = await instanceWater.get("/water/today");
      return wrap.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMonthWater = createAsyncThunk(
  "water/getMonthWater",
  async (month: string, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.get(`/water/month/${month}`);
      return { data: data.data, year: month.slice(0, 4) };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
