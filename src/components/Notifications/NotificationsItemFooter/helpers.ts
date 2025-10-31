import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from 'date-fns/locale/ru';

export const defaultDateFormat = (date: Date): string => {
  const currentDate = new Date();

  if (currentDate.getTime() - date.getTime() < 3600000) {
    return formatDistanceToNow(date, { locale: ruLocale, addSuffix: true });
  }

  if (format(currentDate, 'dd.MM.yyyy') === format(date, 'dd.MM.yyyy')) {
    return format(date, 'HH:mm');
  }

  return format(date, 'dd.MM.yyyy HH:mm');
};
