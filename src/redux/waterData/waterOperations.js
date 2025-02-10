import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  addWaters,
  deleteWater,
  editWater,
  fetchMonthWater,
  fetchTodayWater,
} from '../Api/api';

export const addWatersThunk = createAsyncThunk(
  'water/addWater',
  async (newWater, { rejectWithValue }) => {
    try {
      const {data} = await addWaters(newWater);
      return data.data;
    } catch (error) {
      console.log(error.message);
      switch (error.response.status) {
        case 409:
          toast.error(`You can't add water at the same time twice`);
          return rejectWithValue(error.message);
        case 400:
          toast.warning(`You must write at least 1 ml.`);
          return rejectWithValue(error.message);
        default:
          return rejectWithValue(error.message);
      }
    }
  },
);

export const editWaterThunk = createAsyncThunk(
  'water/editWater',
  async ({ _id, waterVolume, date }, { rejectWithValue }) => {
    try {
      const newWaterUser = { waterVolume, date };
      const response = await editWater({ newWaterUser, id: _id });
      return response;
    } catch (error) {
      if (error.response.status === 400) {
        toast.warning(`You must write at least 1 ml.`);
      }
      return rejectWithValue(error.message);
    }
  },
);

export const deleteWaterThunk = createAsyncThunk(
  'water/deleteWater',
  async (id, { rejectWithValue }) => {
    try {
      deleteWater(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getTodayWater = createAsyncThunk(
  'water/getDayWater',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchTodayWater();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getMonthWater = createAsyncThunk(
  'water/getMonthWater',
  async (month, { rejectWithValue }) => {
    try {
      const data = await fetchMonthWater(month);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
