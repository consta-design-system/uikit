import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const defaultDateFormat = (date: Date): string => {
  const currentDate = new Date();

  if (currentDate.getTime() - date.getTime() < 3600000) {
    const str = formatDistanceToNow(date, {
      locale: ru,
      addSuffix: true,
    });
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (format(currentDate, 'dd.MM.yyyy') === format(date, 'dd.MM.yyyy')) {
    return format(date, 'HH:mm');
  }

  return format(date, 'dd.MM.yyyy HH:mm');
};
