import {
  format,
  parseISO,
  setHours,
  setMinutes,
  isValid,
  parse,
} from "date-fns";

export const formatDate = (
  dateString: string,
  formatString = "yyyy-MM-dd "
) => {
  const date = new Date(dateString);
  return format(date, formatString);
};

export const formatCustomTime = (
  dateString: string,
  formatString = "h:mm a"
) => {
  const date = parseISO(dateString);
  return format(date, formatString);
};

export const formatTo12Hour = (time: string): string => {
  if (!time) return "";

  let parsedTime = parse(time, "HH:mm", new Date());
  if (!isValid(parsedTime)) parsedTime = parseISO(time);

  if (!isValid(parsedTime)) {
    return "";
  }

  return format(parsedTime, "h:mm a");
};

export const cleanTimeInput = (inputTime: string): string => {
  return inputTime.replace(/(AM|PM|am|pm)/gi, "").trim();
};

export const convertTo24HourFormat = (time: string): string => {
  let parsedTime = parse(time, "h:mm a", new Date());
  if (!isValid(parsedTime)) parsedTime = parse(time, "HH:mm", new Date());

  return isValid(parsedTime) ? format(parsedTime, "HH:mm") : "";
};

export function formatTimeToLocalISO(
  time: string,
  initialTime: string,
  isEditing: boolean
): string {
  const baseDate: Date = isEditing ? parseISO(initialTime) : new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const updatedDate: Date = setMinutes(setHours(baseDate, hours), minutes);

  return format(updatedDate, "yyyy-MM-dd'T'HH:mm");
}
