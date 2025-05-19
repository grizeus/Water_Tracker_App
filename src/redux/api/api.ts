import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { setToken } from "../auth/operations";
import type { SignUpInResponse } from "../../../types/global";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _isRefreshTokenRequest?: boolean;
}

interface ResponseData {
  data: {message: string};
  status: number;
  message: string;
}

const instanceWater = axios.create({
  withCredentials: true,
  baseURL: "https://water-tracker-back.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshingToken = false;
let failedRequestsQueue: {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (reason?: Error | AxiosError) => void;
  config: CustomAxiosRequestConfig;
}[] = [];

const processFailedRequestsQueue = (
  error: Error | AxiosError | null,
  token: string | null = null
) => {
  failedRequestsQueue.forEach(promise => {
    if (error) {
      promise.reject(error instanceof Error ? error : new Error(String(error)));
    } else if (token && promise.config.headers) {
      promise.config.headers.Authorization = `Bearer ${token}`;
      instanceWater(promise.config)
        .then(resp => promise.resolve(resp))
        .catch(err => promise.reject(err instanceof Error ? err : new Error(String(err))));
    } else {
      promise.reject(
        new Error(
          "Can't proceed with request due to missing token or unknown error"
        )
      );
    }
  });
  failedRequestsQueue = [];
};

instanceWater.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (err: unknown): Promise<AxiosResponse> => {
    if (!(err instanceof AxiosError)) {
      return Promise.reject(new Error("Unexpected error occurred"));
    }
    const originalRequest = err.config as CustomAxiosRequestConfig;
    const httpStatus = err.response?.status;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const responseData: ResponseData = err.response?.data;

    if (originalRequest?._isRefreshTokenRequest) {
      console.error(
        "Token refresh request itself failed. Exiting...",
        err.response
      );
      isRefreshingToken = false;
      setToken(null);
      processFailedRequestsQueue(err, null);
      return Promise.reject(err);
    }

    if (
      responseData &&
      responseData.data &&
      responseData.data.message === "Invalid email or password!"
    ) {
      return Promise.reject(err);
    }

    if (httpStatus === 401 && originalRequest?.headers) {
      if (!isRefreshingToken) {
        isRefreshingToken = true;
        originalRequest._retry = true;

        try {
          console.log("Attempting to refresh access token...");
          const refreshConfig: CustomAxiosRequestConfig = {
            headers: {},
            _isRefreshTokenRequest: true, // Mark this as the refresh token request
          };
          const refreshResponse = await instanceWater.post<SignUpInResponse>(
            "/auth/refresh",
            undefined,
            refreshConfig
          );
          const newAccessToken = refreshResponse.data.data.accessToken;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          processFailedRequestsQueue(null, newAccessToken);
          isRefreshingToken = false;
          return instanceWater(originalRequest);
        } catch (refreshErr: unknown) {
          if (axios.isAxiosError(refreshErr) && refreshErr.response) {
            console.error(
              "Failed to refresh access token:",
              refreshErr.response?.data || refreshErr.message
            );
            setToken(null);
            processFailedRequestsQueue(refreshErr as Error, null);
            isRefreshingToken = false;
            return Promise.reject(
              new Error("Token refresh failed. Please log in again.")
            );
          }
        }
      } else {
        console.log(
          "Token refresh in progress, queuing request:",
          originalRequest.url
        );
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedRequestsQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }
    }
    return Promise.reject(err);
  }
);

export default instanceWater;
