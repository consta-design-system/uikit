import { Ref, RefObject, useEffect, useRef } from 'react';
import { format, isWithinInterval } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

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

export function noop(): void {
  // do nothing.
}
