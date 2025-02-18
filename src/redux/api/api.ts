import axios from "axios";
import { setToken } from "../auth/operations";

const instanceWater = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

instanceWater.interceptors.response.use(
  response => response,
  async err => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data: wrap } = await instanceWater.post("/auth/refresh");
        setToken(wrap.data.accessToken);
        originalRequest.headers["Authorization"] =
          `Bearer ${wrap.data.accessToken}`;
        return instanceWater(originalRequest);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
);

export default instanceWater;
