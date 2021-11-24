import { useCallback, useState } from 'react';
import { getHours, getMinutes, getSeconds, set } from 'date-fns';

import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { DateTimePropOnChange } from '../helpers';

const getTime = (date?: Date) => {
  if (!date) {
    return [0, 0, 0] as const;
  }
  return [getHours(date), getMinutes(date), getSeconds(date)] as const;
};

export const useOnChange = (onChange: DateTimePropOnChange | undefined) => {
  const [time, setTime] = useState<Date | undefined>();
  const onChangeRef = useMutableRef(onChange);
  const timeRef = useMutableRef(time);

  const onDateChange: DateTimePropOnChange = useCallback(({ e, value }) => {
    const [hours, minutes, seconds] = getTime(timeRef.current);
    onChangeRef.current?.({ e, value: set(value, { hours, minutes, seconds }) });
  }, []);

  const onTimeChange: DateTimePropOnChange = useCallback(({ e, value }) => {
    setTime(value);
    onChangeRef.current?.({ e, value });
  }, []);

  return [onDateChange, onTimeChange];
};
