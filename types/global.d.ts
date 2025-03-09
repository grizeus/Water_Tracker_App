import { ReactNode } from "react";

export type Gender = "woman" | "man";

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

export interface EditWaterEntry {
  id: string;
  amount: number;
  time: number;
}

export interface User {
  email: string | null;
  avatarURL: string | null;
  name: string | null;
  gender: Gender | null;
  dailyGoal: number | null;
}

export interface Credentials {
  email: string;
  password: string;
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
  oldPassword?: string;
  newPassword?: string;
}

export interface DailyData {
  entries: EntryData[];
  dailyGoal: number;
  progress: string;
}

export interface UserFormData {
  gender?: Gender;
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  repeatedPassword?: string;
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
export type OpenerType = () => void;
export type ChildrenProps = ReactNode;
