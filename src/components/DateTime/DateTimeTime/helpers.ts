import { useMemo } from 'react';
import {
  addHours,
  addMinutes,
  addSeconds,
  setHours,
  setMinutes,
  setSeconds,
  startOfToday,
} from 'date-fns';

import { useMutableRef } from '../../../hooks/useMutableRef/useMutableRef';
import { range } from '../../../utils/array';
import { isInMinMaxDade } from '../../../utils/date';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { getLabelHours, getLabelMinutes, getLabelSeconds } from '../helpers';

type DateTimeTimePropLocale = {
  hours?: string;
  minutes?: string;
  seconds?: string;
};

export const dateTimeTimePropLocaleDefault = {
  hours: 'Часы',
  minutes: 'Мин.',
  seconds: 'Сек.',
} as const;

type DateTimeTimePropOnChange = (props: {
  value: Date;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;

type ResultItem = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  selected?: boolean;
};

export type DateTimeTimeProps = PropsWithHTMLAttributes<
  {
    children?: never;
    value?: Date;
    onChange?: DateTimeTimePropOnChange;
    maxDate?: Date;
    minDate?: Date;
    multiplicitySeconds?: number;
    multiplicityMinutes?: number;
    multiplicityHours?: number;
    locale?: DateTimeTimePropLocale;
  },
  HTMLDivElement
>;

const startOfDay = (date: Date) => setHours(date, 0);
const startOfHour = (date: Date) => setMinutes(date, 0);
const startOfMinute = (date: Date) => setSeconds(date, 0);

const getItemData = (
  length: number,
  multiplicity = 1,
  startOfUnit: typeof startOfDay,
  addUnits: typeof addHours,
  getItemLabel: (date: Date) => string,
  value?: Date,
  minDate?: Date,
  maxDate?: Date,
  onChangeRef?: React.MutableRefObject<DateTimeTimePropOnChange | undefined>,
): ResultItem[] => {
  const numbers = range(multiplicity ? Math.floor(length / multiplicity) : 0);

  if (numbers.length === 0) {
    return [];
  }

  const startDate = startOfUnit(value || startOfToday());

  return numbers.map((number) => {
    const date = addUnits(startDate, number * multiplicity);
    const label = getItemLabel(date);
    const selected = value ? getItemLabel(date) === getItemLabel(value) : false;
    const disabled = !isInMinMaxDade(date, minDate, maxDate);
    const onClick = (e: React.MouseEvent<HTMLDivElement>) =>
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
