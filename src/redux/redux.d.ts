export type MonthData = {
  date: string;
  dailyGoal: string;
  percentage: string;
  entriesCount: number;
};

export type EntryData = {
  _id: string;
  time: string;
  amount: number;
};

export type GeneralState = {
  root: RootState;
  auth: AuthState;
  waterData: WaterDataState;
  options: OptionsState;
};

export type RootState = {
  isLoading: boolean;
  error: object | null;
};

export type AuthState = {
  user: {
    email: string | null;
    avatarURL: string | null;
    name: string | null;
    gender: "woman" | "man" | null;
    dailyGoal: number | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

export type WaterDataState = {
  month: MonthData[];
  today: {
    dailyWaterList: EntryData[];
    dailyGoal: number;
    progress: string;
  };
};

export type OptionsState = {
  theme: "light" | "dark";
};

export type Credentials = {
  email: string;
  password: string;
};
