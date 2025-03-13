import {
  addHours,
  format,
  parseISO,
  formatISO,
  setMinutes,
  setHours,
} from "date-fns";
export function formatDate(dateString, formatString = "yyyy-MM-dd ") {
  const date = new Date(dateString);
  return format(date, formatString);
}
export function formatCustomTime(dateString, formatString = "h:mm a") {
  const date = addHours(parseISO(dateString), 0);
  return format(date, formatString);
}

export function formatTimeToLocalISO(time, initialTime, isEditing) {
  const baseDate = isEditing ? parseISO(initialTime) : new Date();
  const [hours, minutes] = time.split(":");

  const updatedDate = setMinutes(setHours(baseDate, hours), minutes);

  return formatISO(updatedDate, { representation: "dateTime" }).slice(0, 16);
}
