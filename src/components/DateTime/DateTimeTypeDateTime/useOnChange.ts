import { getHours, getMinutes, getSeconds, set } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { DateRange } from '../../../utils/types/Date';
import { DateTimePropOnChange, DateTimePropOnChangeRange } from '../helpers';

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
): [
  DateTimePropOnChange,
  DateTimePropOnChangeRange<'date-time'>,
  DateTimePropOnChange,
  Date | undefined,
] => {
  const normalizeValue = Array.isArray(value)
    ? value[timeFor === 'start' ? 0 : 1]
    : value;

  const [time, setTime] = useState<Date | undefined>(normalizeValue);

  const onChangeRef = useMutableRef(onChange);
  const onChangeRangeRef = useMutableRef(onChangeRange);
  const timeRef = useMutableRef(time);

  const onDateChange: DateTimePropOnChange = useCallback(({ e, value }) => {
    const [hours, minutes, seconds] = getTime(timeRef.current);
    onChangeRef.current?.({
      e,
      value: set(value, { hours, minutes, seconds }),
    });
  }, []);

  const onDateChangeRange: DateTimePropOnChangeRange<'date-time'> = useCallback(
    ({ e, value }) => {
      const [hours, minutes, seconds] = getTime(timeRef.current);
      onChangeRangeRef.current?.({
        e,
        value: [
          value[0] ? set(value[0], { hours, minutes, seconds }) : undefined,
          value[1] ? set(value[1], { hours, minutes, seconds }) : undefined,
        ],
      });
    },
    [],
  );

  const onTimeChange: DateTimePropOnChange = useCallback(({ e, value }) => {
    onChangeRef.current?.({ e, value });
  }, []);

  useEffect(() => setTime(normalizeValue), [normalizeValue?.getTime()]);

  return [onDateChange, onDateChangeRange, onTimeChange, normalizeValue];
};
