import { format } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

export const defaultDateFormat = (date: Date): string => {
  const currentDate = new Date();

  if (currentDate.getTime() - date.getTime() < 3600000) {
    const str = formatDistanceToNow(date, {
      locale: ruLocale,
      addSuffix: true,
    });
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (format(currentDate, 'dd.MM.yyyy') === format(date, 'dd.MM.yyyy')) {
    return format(date, 'HH:mm');
  }

  return format(date, 'dd.MM.yyyy HH:mm');
};
