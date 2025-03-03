import { EntryData } from "../redux/redux";

export type OpenerType = () => void;
export type OpenerTypeWithData = (record: EntryData | null) => void;