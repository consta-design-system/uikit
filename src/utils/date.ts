import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { DateRange } from './types/Date';
import { isDefined } from './type-guards';

export const getMonthTitle = (date: Date): string => {
  return format(date, 'LLLL', { locale: ruLocale });
};

export const isDateRange: (value?: Date | DateRange) => value is DateRange = (
  value,
): value is DateRange =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every((date) => date instanceof Date || !isDefined(date));

export const isOnlyOneDateInRange = (range: DateRange): boolean => {
  return Boolean((range[0] && !range[1]) || (!range[0] && range[1]));
};
