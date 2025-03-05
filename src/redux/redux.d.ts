type Gender = "woman" | "man";

export interface MonthData {
  date: string;
  dailyGoal: string;
  percentage: string;
  entriesCount: number;
}

export interface EntryData {
  _id: string;
  time: string;
  amount: number;
}

export interface RootState {
  isLoading: boolean;
  error: object | null;
}

export interface PersistedUser {
  email: string;
  avatarURL: string | null;
  name: string;
  gender: Gender;
  dailyGoal: number;
}

export interface User {
  email: string | null;
  avatarURL: string | null;
  name: string | null;
  gender: Gender | null;
  dailyGoal: number | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

export interface WaterDataState {
  month: MonthData[];
  today: {
    dailyWaterList: EntryData[];
    dailyGoal: number;
    progress: string;
  };
}

export interface OptionsState {
  theme: "light" | "dark";
}

export interface Credentials {
  email: string;
  password: string;
}

interface Response<T> {
  status: number;
  message: string;
  data: T;
}

interface AuthData {
  accessToken: string;
}

interface UserData {
  name: string;
  email: string;
  dailyGoal: number;
  gender: Gender;
  avatarURL?: string;
}

interface ErrorData {
  message: string;
}

export type SignUpInResponse = Response<AuthData>;
export type GetUserResponse = Response<UserData>;
export type AddEditWaterResponse = Response<EntryData>;
export type NormaWaterResponse = Response<number>;
export type MonthlyWaterResponse = Response<MonthData[]>;
export type DailyWaterResponse = Response<DailyData>;
export type WaterError = Response<ErrorData>;

export interface UpdAvatarResponse {
  status: number;
  message: string;
  avatarURL: string;
}

export interface UpdUserReq {
  name?: string;
  email?: string;
  dailyGoal?: number;
  gender?: Gender;
  oldPassword?: string;
  newPassword?: string;
}

export interface DailyData {
  entries: EntryData[];
  dailyGoal: number;
  progress: string;
}
