import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { setToken } from "../auth/operations";
import type { SignUpInResponse } from "../redux.d.ts";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const instanceWater = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

instanceWater.interceptors.response.use(
  response => response,
  async (err: unknown): Promise<AxiosResponse> => {
    if (!(err instanceof AxiosError)) {
      return Promise.reject(new Error("Unexpected error occurred"));
    }
    const originalRequest = err.config as CustomAxiosRequestConfig;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { status, data } = (err.response as AxiosResponse) ?? {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (data.data?.message === "Invalid email or password!") {
      return Promise.reject(err);
    }
    if (status === 401 && originalRequest.headers) {
      if (!originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          const response =
            await instanceWater.post<SignUpInResponse>("/auth/refresh");
          const newToken = response.data.data.accessToken;
          setToken(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return instanceWater(originalRequest);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          return Promise.reject(new Error("Token refresh failed"));
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instanceWater;
