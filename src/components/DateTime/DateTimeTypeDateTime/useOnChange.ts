import {
  getHours,
  getMinutes,
  getSeconds,
  set,
  startOfDay,
  startOfToday,
} from 'date-fns';
import { useCallback, useEffect } from 'react';

import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { DateRange } from '../../../utils/types/Date';
import { getFirstValidDateTime } from '../DateTimeTypeTime/helpers';
import {
  DateTimePropDisableDates,
  DateTimePropOnChange,
  DateTimePropOnChangeRange,
  TimeOptions,
} from '../helpers';

const getTime = (date?: Date) => {
  if (!date) {
    return [0, 0, 0] as const;
  }
  return [getHours(date), getMinutes(date), getSeconds(date)] as const;
};

export const useOnChange = (
  onChange: DateTimePropOnChange | undefined,
  onChangeRange: DateTimePropOnChangeRange<'date-time'> | undefined,
  value: DateRange | Date | undefined,
  timeFor: 'start' | 'end',
  timeOptions?: TimeOptions,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateTimePropDisableDates,
): [
  DateTimePropOnChange,
  DateTimePropOnChangeRange<'date-time'>,
  DateTimePropOnChange,
  Date | undefined,
] => {
  const isRange = value !== undefined && Array.isArray(value);
  const normalizeValue = isRange ? value[timeFor === 'start' ? 0 : 1] : value;

  const previousRangeRef = useMutableRef<Date | undefined>(
    isRange ? normalizeValue : undefined,
  );

  const onChangeRef = useMutableRef(onChange);
  const onChangeRangeRef = useMutableRef(onChangeRange);

  const getValidTimeValue = (value: Date | undefined): Date => {
    const startOfDayDate = startOfDay(value || startOfToday());

    const validValue = getFirstValidDateTime(
      startOfDayDate,
      timeOptions,
      minDate,
      maxDate,
      disableDates,
    );
    return validValue;
  };

  const applyTimeToRange = (
    range: DateRange,
    timeSource: Date | undefined,
  ): DateRange => {
    if (!timeSource) return range;
    const [hours, minutes, seconds] = getTime(timeSource);
    const [start, end] = range;

    const newStart = start ? set(start, { hours, minutes, seconds }) : start;
    const newEnd = end ? set(end, { hours, minutes, seconds }) : end;

    return [newStart, newEnd];
  };

  const onDateChange: DateTimePropOnChange = useCallback((value, { e }) => {
    const validValue = getValidTimeValue(value);
    onChangeRef.current?.(validValue, {
      e,
    });
  }, []);

  const onDateChangeRange: DateTimePropOnChangeRange<'date-time'> = useCallback(
    (value, { e }) => {
      const currentRange = value as DateRange;
      const timeForEnd =
        timeFor === 'start' ? currentRange[0] : currentRange[1];
      const prevTimeForEnd = previousRangeRef.current || undefined;
      const isTimeForEndChanged =
        timeForEnd?.getTime() !== prevTimeForEnd?.getTime();
      const validTimeValue = isTimeForEndChanged
        ? getValidTimeValue(timeForEnd)
        : timeForEnd;
      const newRange = applyTimeToRange(currentRange, validTimeValue);
      onChangeRangeRef.current?.(newRange, { e });
    },
    [timeFor],
  );

  const onTimeChange: DateTimePropOnChange = useCallback(
    (selectedValue, { e }) => {
      onChangeRef.current?.(selectedValue, { e });
    },
    [],
  );

  useEffect(() => {
    previousRangeRef.current = isRange ? normalizeValue : undefined;
  }, [isRange, normalizeValue]);

  return [onDateChange, onDateChangeRange, onTimeChange, normalizeValue];
};
