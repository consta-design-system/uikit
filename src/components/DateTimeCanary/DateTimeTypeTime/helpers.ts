import { useMemo } from 'react';
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

import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { range } from '../../../utils/array';
import { isInMinMaxDade } from '../../../utils/date';
import { getLabelHours, getLabelMinutes, getLabelSeconds } from '../helpers';

export const dateTimeTimePropLocaleDefault = {
  hours: 'Час',
  minutes: 'Мин',
  seconds: 'Сек',
} as const;

type DateTimeTimePropOnChange = (props: {
  value: Date;
  e: React.MouseEvent<HTMLButtonElement>;
}) => void;

type ResultItem = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  selected?: boolean;
};

const getItemData = (
  length: number,
  multiplicity = 1,
  startOfUnits: (date: Date) => Date,
  startOfUnit: (date: Date) => Date,
  endOfUnit: (date: Date) => Date,
  addUnits: typeof addHours,
  getItemLabel: (date: Date) => string,
  value?: Date,
  minDate?: Date,
  maxDate?: Date,
  onChangeRef?: React.MutableRefObject<DateTimeTimePropOnChange | undefined>,
): ResultItem[] => {
  const numbers = range(multiplicity ? Math.ceil(length / multiplicity) : 0);

  if (numbers.length === 0) {
    return [];
  }

  const startDate = startOfUnits(value || startOfToday());

  return numbers.map((number) => {
    const date = addUnits(startDate, number * multiplicity);
    const label = getItemLabel(date);
    const selected = value ? getItemLabel(date) === getItemLabel(value) : false;
    const disabled = !isInMinMaxDade(date, minDate, maxDate, startOfUnit, endOfUnit);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
      !disabled && onChangeRef?.current?.({ e, value: date });

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
  multiplicityHours?: number,
  multiplicityMinutes?: number,
  multiplicitySeconds?: number,
  onChange?: DateTimeTimePropOnChange,
  minDate?: Date,
  maxDate?: Date,
): ResultItem[][] => {
  const onChangeRef = useMutableRef(onChange);

  return useMemo(
    () => [
      getItemData(
        24,
        multiplicityHours,
        startOfDay,
        startOfHour,
        endOfHour,
        addHours,
        getLabelHours,
        value,
        minDate,
        maxDate,
        onChangeRef,
      ),
      getItemData(
        60,
        multiplicityMinutes,
        startOfHour,
        startOfMinute,
        endOfMinute,
        addMinutes,
        getLabelMinutes,
        value,
        minDate,
        maxDate,
        onChangeRef,
      ),
      getItemData(
        60,
        multiplicitySeconds,
        startOfMinute,
        startOfSecond,
        endOfSecond,
        addSeconds,
        getLabelSeconds,
        value,
        minDate,
        maxDate,
        onChangeRef,
      ),
    ],
    [
      value?.getTime(),
      minDate?.getTime(),
      maxDate?.getTime(),
      multiplicityHours,
      multiplicityMinutes,
      multiplicitySeconds,
    ],
  );
};
