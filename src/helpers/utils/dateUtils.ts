import { format, parseISO } from "date-fns";

export const formatDate = (dateString: string, formatString = "yyyy-MM-dd ") => {
  const date = new Date(dateString);
  return format(date, formatString);
};

export const formatCustomTime = (dateString: string, formatString = "h:mm a") => {
  const date = parseISO(dateString);
  return format(date, formatString);
};
