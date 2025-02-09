import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../auth/authSelectors';

axios.defaults.baseURL = 'https://watertrackerbackend-5ymk.onrender.com';

const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const unsetToken = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Auth

export const signup = async body => {
  const { data } = await axios.post('/auth/signup', body);
  setToken(data.accessToken);
  return data;
};

export const signin = async body => {
  const { data } = await axios.post('/auth/signin', body);
  setToken(data.accessToken);
  return data;
};

export const logout = async () => {
  await axios.post('/auth/logout');
  unsetToken();
};

export const requestPassword = async body => {
  const { data } = await axios.post('/auth/request-pass', body);
  return data;
};

export const resetPassword = async body => {
  const { data } = await axios.post('/auth/reset-pass', body);
  return data;
};

// User

export const updateWaterRate = async newWaterRate => {
  const { data } = await axios.patch('/waterrate', {
    waterRate: newWaterRate,
  });
  return data;
};

export const getUser = async token => {
  setToken(token);
  const { data } = await axios.get('/user');
  return data;
};

export const updateAvatar = async newPhotoFile => {
  const {
    data: { avatarURL },
  } = await axios.patch('/user/avatar', newPhotoFile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return avatarURL;
};

export const editUserInfo = async body => {
  const { data } = await axios.patch('/user', body);
  return data;
};

export const deleteUser = async () => {
  await axios.delete('/user/delete-account');
  unsetToken();
};

// Water
export const addWaters = async newWater => {
  const token = useSelector(selectUserToken);
  const { data } = await axios.post('/water/entry',  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,

    },
  });
  return data;
};

export const editWater = async ({ newWaterUser, id }) => {
  const { data } = await axios.patch(`/water/entry/${id}`, newWaterUser, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};

export const deleteWater = async id => {
  await axios.delete(`/water/entry/${id}`);
};

export const fetchTodayWater = async () => {
  const token = useSelector(selectUserToken);
  const data = await axios.get('/water/today', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return data;
};

export const fetchMonthWater = async (month) => {
  const token = useSelector(selectUserToken);
  const data = await axios.get(`/water/month/${month}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return data;
};
