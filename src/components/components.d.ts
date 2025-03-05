import { EntryData, Gender } from "../redux/redux";

export type OpenerType = () => void;
export type OpenerTypeWithData = (record: EntryData | null) => void;

export interface UserFormData {
  gender?: Gender;
  name?: string;
  oldPassword?: string;
  newPassword?: string;
}
