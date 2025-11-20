import {
  addHours,
  addMinutes,
  addSeconds,
  endOfHour,
  endOfMinute,
  endOfSecond,
  set,
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
  date: Date;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  selected?: boolean;
};

const getItemData = (
  timeType: 'hours' | 'minutes' | 'seconds',
  startOfUnits: (date: Date) => Date,
  startOfUnit: (date: Date) => Date,
  endOfUnit: (date: Date) => Date,
  addUnits: typeof addHours | typeof addMinutes | typeof addSeconds,
  getItemLabel: (date: Date) => string,
  options?: TimeUnitOptions,
  value?: Date,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateTimePropDisableDates,
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

    return {
      label,
      date,
      selected,
      disabled,
    };
  });
};

const buildUnitItems = (
  unit: 'hours' | 'minutes' | 'seconds',
  value: Date | undefined,
  options: TimeUnitOptions,
  minDate: Date | undefined,
  maxDate: Date | undefined,
  disableDates: DateTimePropDisableDates | undefined,
) => {
  switch (unit) {
    case 'hours':
      return getItemData(
        'hours',
        startOfDay,
        startOfHour,
        endOfHour,
        addHours,
        getLabelHours,
        options,
        value,
        minDate,
        maxDate,
        disableDates,
      );
    case 'minutes':
      return getItemData(
        'minutes',
        startOfHour,
        startOfMinute,
        endOfMinute,
        addMinutes,
        getLabelMinutes,
        options,
        value,
        minDate,
        maxDate,
        disableDates,
      );
    case 'seconds':
      return getItemData(
        'seconds',
        startOfMinute,
        startOfSecond,
        endOfSecond,
        addSeconds,
        getLabelSeconds,
        options,
        value,
        minDate,
        maxDate,
        disableDates,
      );
  }
};

const validateUnit = (
  newDate: Date,
  unit: 'hours' | 'minutes' | 'seconds',
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateTimePropDisableDates,
  options?: TimeUnitOptions,
) => {
  const items = buildUnitItems(
    unit,
    newDate,
    options || {},
    minDate,
    maxDate,
    disableDates,
  );

  let target: number;
  switch (unit) {
    case 'hours':
      target = newDate.getHours();
      break;
    case 'minutes':
      target = newDate.getMinutes();
      break;
    case 'seconds':
      target = newDate.getSeconds();
      break;
  }

  const exact = items.find(
    (item) => parseInt(item.label, 10) === target && !item.disabled,
  );
  if (exact) return exact;

  const first = items.find((i) => !i.disabled);
  return first || null;
};

export const getValidDate = (
  date: Date,
  hoursOptions: TimeUnitOptions,
  minutesOptions: TimeUnitOptions,
  secondsOptions: TimeUnitOptions,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateTimePropDisableDates,
): Date => {
  const newDate = new Date(date);

  const h = validateUnit(
    newDate,
    'hours',
    minDate,
    maxDate,
    disableDates,
    hoursOptions,
  );
  if (h) newDate.setHours(parseInt(h.label, 10));

  const m = validateUnit(
    newDate,
    'minutes',
    minDate,
    maxDate,
    disableDates,
    minutesOptions,
  );
  if (m) newDate.setMinutes(parseInt(m.label, 10));

  const s = validateUnit(
    newDate,
    'seconds',
    minDate,
    maxDate,
    disableDates,
    secondsOptions,
  );
  if (s) newDate.setSeconds(parseInt(s.label, 10));

  return newDate;
};

export const getFirstValidDateTime = (
  date: Date,
  hoursOptions: TimeUnitOptions,
  minutesOptions: TimeUnitOptions,
  secondsOptions: TimeUnitOptions,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateTimePropDisableDates,
): Date => {
  const start = startOfDay(date);

  const validHours = buildUnitItems(
    'hours',
    start,
    hoursOptions,
    minDate,
    maxDate,
    disableDates,
  )
    .filter((h) => !h.disabled)
    .map((h) => parseInt(h.label, 10));

  if (validHours.length === 0) return start;

  for (const hour of validHours) {
    const hourDate = set(start, { hours: hour });
    const validMinutes = buildUnitItems(
      'minutes',
      hourDate,
      minutesOptions,
      minDate,
      maxDate,
      disableDates,
    )
      .filter((m) => !m.disabled)
      .map((m) => parseInt(m.label, 10));

    if (validMinutes.length === 0) continue;

    for (const minute of validMinutes) {
      const minuteDate = set(hourDate, { minutes: minute });
      const validSeconds = buildUnitItems(
        'seconds',
        minuteDate,
        secondsOptions,
        minDate,
        maxDate,
        disableDates,
      )
        .filter((s) => !s.disabled)
        .map((s) => parseInt(s.label, 10));

      if (validSeconds.length === 0) continue;

      return set(minuteDate, { seconds: validSeconds[0] });
    }
  }
  return start;
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
): Omit<ResultItem, 'date'>[][] => {
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

  const [hoursItems, minutesItems, secondsItems] = useMemo(() => {
    const hours = buildUnitItems(
      'hours',
      value,
      hoursOptions,
      minDate,
      maxDate,
      disableDates,
    );
    const minutes = buildUnitItems(
      'minutes',
      value,
      minutesOptions,
      minDate,
      maxDate,
      disableDates,
    );
    const seconds = buildUnitItems(
      'seconds',
      value,
      secondsOptions,
      minDate,
      maxDate,
      disableDates,
    );

    const wrap = (item: ResultItem) => {
      if (item.disabled) return;

      item.onClick = (e) => {
        const valid = getValidDate(
          item.date,
          hoursOptions,
          minutesOptions,
          secondsOptions,
          minDate,
          maxDate,
          disableDates,
        );
        onChangeRef.current?.(valid, { e });
      };
    };

    hours.forEach(wrap);
    minutes.forEach(wrap);
    seconds.forEach(wrap);

    return [hours, minutes, seconds];
  }, [
    value?.getTime(),
    minDate?.getTime(),
    maxDate?.getTime(),
    hoursOptions,
    minutesOptions,
    secondsOptions,
    disableDates,
  ]);

  return [hoursItems, minutesItems, secondsItems];
};
