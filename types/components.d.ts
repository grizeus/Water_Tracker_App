import { EntryData } from "./global";

export type OpenerTypeWithData = (record: EntryData | null) => void;

export interface TodayListModalProps {
  initialAmount?: number;
  initialTime?: string | null;
  isEditing?: boolean;
  existingRecordId?: string | null;
  onClose: () => void;
  onShow?: OpenerType | OpenerTypeWithData;
}
