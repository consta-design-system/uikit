import { Ref, RefObject, useEffect, useRef } from 'react';
import {
  addQuarters,
  differenceInQuarters,
  endOfDay,
  endOfQuarter,
  endOfYear,
  format,
  isWithinInterval,
  startOfDay,
  startOfYear,
} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { range } from '../../utils/array';
import { isDefined } from '../../utils/type-guards';

import { isDateFromInputIsFullyEntered } from './DatePickerInputDate/helpers';
import { DateRange, MinMaxDate, ValueProps } from './types';

export const isDateRange: (value?: Date | DateRange) => value is DateRange = (
  value,
): value is DateRange =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every((date) => date instanceof Date || !isDefined(date));

export const getCurrentVisibleDate = ({
  value,
  minDate,
  maxDate,
}: ValueProps<Date | DateRange> & MinMaxDate): Date => {
  const selectedDate = (isDateRange(value) ? value[1] || value[0] : value) || new Date();

  if (selectedDate > maxDate) {
    return maxDate;
  }

  if (selectedDate < minDate) {
    return minDate;
  }

  return selectedDate;
};

export const getMonthTitle = (date: Date): string => {
  return format(date, 'LLLL', { locale: ruLocale });
};

export const isDateOutOfRange = ({
  date,
  minDate,
  maxDate,
}: {
  date?: Date;
} & MinMaxDate): boolean => {
  return !!date && !isWithinInterval(date, { start: minDate, end: maxDate });
};

export const isDateIsInvalid = ({
  date,
  minDate,
  maxDate,
}: {
  date?: Date;
} & MinMaxDate): boolean => {
  return (
    !!date &&
    isDateFromInputIsFullyEntered(date) &&
    isDateOutOfRange({
      date,
      minDate,
      maxDate,
    })
  );
};

export const isOnlyOneDateInRange = (range: DateRange): boolean => {
  return Boolean((range[0] && !range[1]) || (!range[0] && range[1]));
};

export const isDateFullyEntered = (value: Date | DateRange): boolean => {
  if (!isDateRange(value)) {
    return isDateFromInputIsFullyEntered(value);
  }

  if (value[0] && !value[1]) {
    return isDateFromInputIsFullyEntered(value[0]);
  }

  if (value[1] && !value[0]) {
    return isDateFromInputIsFullyEntered(value[1]);
  }

  return (
    !!value[0] &&
    isDateFromInputIsFullyEntered(value[0]) &&
    !!value[1] &&
    isDateFromInputIsFullyEntered(value[1])
  );
};

export const useCombinedRefs = <T>(...refs: Ref<T>[]): RefObject<T> => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        // eslint-disable-next-line no-param-reassign
        ref = targetRef;
      }
    });
  }, [refs]);

  return targetRef;
};

export const makeQuartersRanges = ({
  date,
  minDate,
  maxDate,
}: {
  date: Date;
} & MinMaxDate): Array<{ range: DateRange; title: string }> => {
  const currentYear = date.getFullYear();
  const startDate = startOfYear(date);
  const endDate = endOfYear(date);
  const quarterAmount = differenceInQuarters(endDate, startDate) + 1;

  return range(quarterAmount).map((index) => {
    const start = startOfDay(addQuarters(startDate, index));
    const end = endOfDay(endOfQuarter(start));
    let dateRange: DateRange;

    if (start > maxDate || end < minDate) {
      dateRange = [];
    } else {
      dateRange = [start > minDate ? start : minDate, end < maxDate ? end : maxDate];
    }
    return {
      range: dateRange,
      title: `${index + 1} кв. ${currentYear}`,
    };
  });
};
