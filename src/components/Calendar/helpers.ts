import {
  addDays,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { chunk, range } from '../../utils/array';
import { isDateRange, isOnlyOneDateInRange } from '../../utils/date';
import { isDefined } from '../../utils/type-guards';
import { DateRange } from '../../utils/types/Date';

export const dateComparer = (a?: Date, b?: Date): number =>
  (a?.getTime() ?? 0) - (b?.getTime() ?? 0);

export const getStartAndEndDate = (date1: Date, date2: Date): { start: Date; end: Date } => {
  const [start, end] = [date1, date2].sort(dateComparer);

  return { start, end };
};

export const isDateHighlighted = ({
  date,
  value,
  hoveredDate,
}: {
  date: Date;
  hoveredDate?: Date;
  value?: Date | DateRange;
}): boolean => {
  if (!hoveredDate || !isDateRange(value) || !isOnlyOneDateInRange(value)) {
    return false;
  }

  const [startDate, endDate] = value;

  if (isDefined(startDate)) {
    return isWithinInterval(date, getStartAndEndDate(startDate, hoveredDate));
  }

  if (isDefined(endDate)) {
    return isWithinInterval(date, getStartAndEndDate(endDate, hoveredDate));
  }

  return false;
};

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
      const { start, end } = getStartAndEndDate(value[0], value[1]);
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

export const getMonthWeeks = (date: Date): (Date | undefined)[][] => {
  const currentMonth = date.getMonth();
  const startDate = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
  const diffDays = differenceInDays(endDate, startDate) + 1;

  const days = range(diffDays).map((index) => {
    const day = addDays(startDate, index);

    if (day.getMonth() === currentMonth) {
      return day;
    }

    return undefined;
  });

  return chunk(days, 7);
};
