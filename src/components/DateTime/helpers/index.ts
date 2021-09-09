import {
  addYears,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  Locale,
  startOfWeek,
} from 'date-fns';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

import { isDateRange, isOnlyOneDateInRange } from '../../../utils/date';
import { isDefined } from '../../../utils/type-guards';
import { DateRange } from '../../../utils/types/Date';

export const dateComparer = (a?: Date, b?: Date): number =>
  (a?.getTime() ?? 0) - (b?.getTime() ?? 0);

export const getStartAndEndDate = (date1: Date, date2: Date): Date[] =>
  [date1, date2].sort(dateComparer);

export const isDateSelected = ({ date, value }: { date: Date; value?: Date }): boolean => {
  return value ? isSameDay(value, date) : false;
};

export const isValueSelected = ({
  date,
  value,
}: {
  date: Date;
  value?: Date | DateRange;
}): boolean => {
  if (isDateRange(value)) {
    if (value[0] && value[1]) {
      const [start, end] = getStartAndEndDate(value[0], value[1]);
      return isWithinInterval(date, { start, end });
    }

    return isDateSelected({ date, value: value[0] || value[1] });
  }
  return isDateSelected({ date, value });
};

export const isValueSelectedBackwards = ({
  value,
  hoveredDate,
}: {
  value?: Date | DateRange;
  hoveredDate?: Date;
}): boolean | undefined => {
  return (
    hoveredDate &&
    isDateRange(value) &&
    isOnlyOneDateInRange(value) &&
    ((isDefined(value[0]) && isBefore(hoveredDate, value[0])) ||
      (isDefined(value[1]) && isBefore(hoveredDate, value[1])))
  );
};

export const getMonthTitle = (date: Date, locale: Locale): string => {
  return format(date, 'LLLL', { locale });
};

export const getMouthLabelWithYear = (date: Date, locale: Locale): string => {
  return `${getMonthTitle(date, locale)} ${date.getFullYear()}`;
};

export const getDecadeTitle = (date: Date): string => {
  return `${format(date, 'yyyy')} - ${format(addYears(date, 9), 'yyyy')}`;
};

export const getDaysOfWeek = (locale: Locale): string[] => {
  const now = new Date();

  return eachDayOfInterval({
    start: startOfWeek(now, { locale }),
    end: endOfWeek(now, { locale }),
  }).map((date) => format(date, 'EEEEEE', { locale }));
};

export * from './useCurrentVisibleDate';
export * from './types';
export * from './getDaysOfMonth';
export * from './getYearsOfDecade';
export * from './getHandleSelectDate';
export * from './isEqualDay';
export * from './isEqualYear';
