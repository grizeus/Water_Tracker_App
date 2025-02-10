import { addHours, format, parseISO } from 'date-fns';

export function formatDate(dateString, formatString = 'yyyy-MM-dd') {
  if (!dateString) return 'Invalid date';
  const date = new Date(dateString);
  return format(date, formatString);
}

export function formatCustomTime(dateString, formatString = 'h:mm a') {
  if (!dateString) return 'Invalid time'; // Предотвращаем ошибки
  try {
    const date = addHours(parseISO(dateString), 0);
    return format(date, formatString);
  } catch (error) {
    console.log('Invalid dateString:', dateString);
    return 'Invalid time';
  }
}
