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

export interface GeneralState {
  root: RootState;
  auth: AuthState;
  waterData: WaterDataState;
  options: OptionsState;
}

export interface RootState {
  isLoading: boolean;
  error: object | null;
}

export interface PersistedUser {
  email: string;
  avatarURL: string | null;
  name: string ;
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

export interface SignUpInResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface GetUserResponse {
  status: number;
  message: string;
  data: {
    name: string
    email: string;
    dailyGoal: number;
    gender: Gender;
    avatarURL?: string;
  };
}

export interface AddEditWaterResponse {
  status: number;
  message: string;
  data: EntryData;
}

export interface NormaWaterResponse {
  status: number;
  message: string;
  data: number;
}

export interface MonthlyWaterResponse {
  status: number;
  message: string;
  data: MonthData[];
}

export interface DailyWaterResponse {
  status: number;
  message: string;
  data: DailyData;
}

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
  oldPassword?: string
  newPassword?: string
}

export interface DailyData {
  entries: EntryData[];
  dailyGoal: number;
  progress: string;
}
