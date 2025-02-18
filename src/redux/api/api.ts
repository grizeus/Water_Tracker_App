import axios from 'axios';

const instanceWater = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instanceWater;