import { Gender, User, EntryData, MonthData } from "./global";

export interface PersistedUser {
  email: string;
  avatarURL: string | null;
  name: string;
  gender: Gender;
  dailyGoal: number;
}

export interface OptionsState {
  theme: "light" | "dark";
}

export interface LoadErorState {
  isLoading: boolean;
  error: object | null;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isAvatarLoading: boolean;
}

export interface WaterDataState {
  month: MonthData[];
  today: {
    dailyWaterList: EntryData[];
    dailyGoal: number;
    progress: string;
  };
}

export interface IntermediateData {
  user: string;
  token: string;
  _persist: string;
}
