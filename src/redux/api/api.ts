import axios, { AxiosError } from "axios";
import { setToken } from "../auth/operations";
import type { SignUpInResponse, WaterError } from "../redux.d.ts";

const instanceWater = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
type WaterErrorResponse = AxiosError<WaterError>;
let refreshSubs: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubs.push(cb);
}

function onTokenRefreshed(token: string) {
  refreshSubs.forEach(cb => cb(token));
  refreshSubs = [];
}

instanceWater.interceptors.response.use(
  response => response,
  async (err: unknown) => {
    if (err instanceof AxiosError) {
      const typedError = err as WaterErrorResponse;
      const originalRequest = typedError.config;
      if (
        typedError.response?.data.data.message === "Invalid email or password!"
      ) {
        return Promise.reject(err);
      }
      if (typedError.response?.status === 401) {
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          if (isRefreshing) {
            // Wait for the token to be refreshed
            return new Promise(resolve => {
              subscribeTokenRefresh(token => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                resolve(instanceWater(originalRequest));
              });
            });
          }

          isRefreshing = true;

          try {
            const { data: wrap } =
              await instanceWater.post<SignUpInResponse>("/auth/refresh");
            const newToken = wrap.data.accessToken;
            setToken(newToken);
            originalRequest.headers["Authorization"] =
              `Bearer ${wrap.data.accessToken}`;

            onTokenRefreshed(newToken);
            isRefreshing = false;
            return instanceWater(originalRequest);
          } catch (refreshErr) {
            isRefreshing = false;
            refreshSubs = [];
            return Promise.reject(refreshErr);
          }
        }
      }
      return Promise.reject(err);
    }
  }
);

export default instanceWater;
