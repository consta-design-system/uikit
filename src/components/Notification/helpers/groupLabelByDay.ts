import { format, isToday, isYesterday } from 'date-fns';

export const groupLabelByDay = (timestamp: number | string) => {
  const date = Number(timestamp);

  if (isToday(date)) {
    return 'Сегодня';
  }
  if (isYesterday(date)) {
    return 'Вчера';
  }
  return format(date, 'dd.MM.yyyy');
};
