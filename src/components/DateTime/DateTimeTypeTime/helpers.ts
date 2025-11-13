import {
  addHours,
  addMinutes,
  addSeconds,
  endOfHour,
  endOfMinute,
  endOfSecond,
  startOfDay,
  startOfHour,
  startOfMinute,
  startOfSecond,
  startOfToday,
} from 'date-fns';
import { useMemo } from 'react';

import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { isDisableDate, isInMinMaxDate } from '../../../utils/date';
import {
  DateTimePropDisableDates,
  getLabelHours,
  getLabelMinutes,
  getLabelSeconds,
  getTimeNumbers,
  TimeOptions,
  TimeUnitOptions,
} from '../helpers';

export const dateTimeTimePropLocaleDefault = {
  hours: 'Час',
  minutes: 'Мин',
  seconds: 'Сек',
} as const;

type DateTimeTimePropOnChange = (
  value: Date,
  props: {
    e: React.MouseEvent<HTMLButtonElement>;
  },
) => void;

type ResultItem = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  selected?: boolean;
};

const getItemData = (
  timeType: 'hours' | 'minutes' | 'seconds',
  options: TimeUnitOptions,
  startOfUnits: (date: Date) => Date,
  startOfUnit: (date: Date) => Date,
  endOfUnit: (date: Date) => Date,
  addUnits: typeof addHours | typeof addMinutes | typeof addSeconds,
  getItemLabel: (date: Date) => string,
  value?: Date,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateTimePropDisableDates,
  onChangeRef?: React.MutableRefObject<DateTimeTimePropOnChange | undefined>,
): ResultItem[] => {
  const numbers = getTimeNumbers(timeType, options);

  if (numbers.length === 0) {
    return [];
  }

  const startDate = startOfUnits(value || startOfToday());

  return numbers.map((number) => {
    const date = addUnits(startDate, number);
    const label = getItemLabel(date);
    const selected = value ? getItemLabel(date) === getItemLabel(value) : false;
    const disabled =
      !isInMinMaxDate(date, minDate, maxDate, startOfUnit, endOfUnit) ||
      isDisableDate({ date, disableDates, mode: 'time', timeType });
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
      !disabled && onChangeRef?.current?.(date, { e });

    return {
      label,
      selected,
      disabled,
      onClick,
    };
  });
};

export const useTimeItems = (
  value?: Date,
  timeOptions?: TimeOptions,
  multiplicityHours?: number,
  multiplicityMinutes?: number,
  multiplicitySeconds?: number,
  onChange?: DateTimeTimePropOnChange,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateTimePropDisableDates,
): ResultItem[][] => {
  const onChangeRef = useMutableRef(onChange);

  const hoursOptions: TimeUnitOptions =
    timeOptions?.hours ??
    (multiplicityHours !== undefined ? { step: multiplicityHours } : {});
  const minutesOptions: TimeUnitOptions =
    timeOptions?.minutes ??
    (multiplicityMinutes !== undefined ? { step: multiplicityMinutes } : {});
  const secondsOptions: TimeUnitOptions =
    timeOptions?.seconds ??
    (multiplicitySeconds !== undefined ? { step: multiplicitySeconds } : {});

  return useMemo(
    () => [
      getItemData(
        'hours',
        hoursOptions,
        startOfDay,
        startOfHour,
        endOfHour,
        addHours,
        getLabelHours,
        value,
        minDate,
        maxDate,
        disableDates,
        onChangeRef,
      ),
      getItemData(
        'minutes',
        minutesOptions,
        startOfHour,
        startOfMinute,
        endOfMinute,
        addMinutes,
        getLabelMinutes,
        value,
        minDate,
        maxDate,
        disableDates,
        onChangeRef,
      ),
      getItemData(
        'seconds',
        secondsOptions,
        startOfMinute,
        startOfSecond,
        endOfSecond,
        addSeconds,
        getLabelSeconds,
        value,
        minDate,
        maxDate,
        disableDates,
        onChangeRef,
      ),
    ],
    [
      value?.getTime(),
      minDate?.getTime(),
      maxDate?.getTime(),
      timeOptions,
      multiplicityHours,
      multiplicityMinutes,
      multiplicitySeconds,
      disableDates,
    ],
  );
};
