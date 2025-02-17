import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instanceWater from "../Api/api";

export const addWaterThunk = createAsyncThunk(
  "water/addWater",
  async (newWater, { rejectWithValue }) => {
    try {
      const data = await instanceWater.post("/water/entry", newWater);
      return data.data;
    } catch (error) {
      switch (error.response.status) {
        case 400:
          toast.warning(`You must add from 50 ml to 5 L.`);
          return rejectWithValue(error.message);
        default:
          return rejectWithValue(error.message);
      }
    }
  }
);

export const editWaterThunk = createAsyncThunk(
  "water/editWater",
  async ({ id, amount, time }, { rejectWithValue }) => {
    try {
      const { data: wrap } = await instanceWater.patch(`/water/entry/${id}`, {
        amount,
        time,
      });
      return wrap.data;
    } catch (error) {
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
    } catch (error) {
      if (error.response.status === 400) {
        toast.warning(`You must add from 500 ml to 15.0 L.`);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWaterThunk = createAsyncThunk(
  "water/deleteWater",
  async (id, { rejectWithValue }) => {
    try {
      await instanceWater.delete(`/water/entry/${id}`);
      return id;
    } catch (error) {
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMonthWater = createAsyncThunk(
  "water/getMonthWater",
  async (month, { rejectWithValue }) => {
    try {
      const { data } = await instanceWater.get(`/water/month/${month}`);
      return { data: data.data, year: month.slice(0, 4) };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
