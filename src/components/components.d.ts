import { EntryData, Gender } from "../redux/redux";

export type OpenerType = () => void;
export type OpenerTypeWithData = (record: EntryData | null) => void;

export interface UserFormData {
  gender?: Gender;
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  repeatedPassword?: string;
}
