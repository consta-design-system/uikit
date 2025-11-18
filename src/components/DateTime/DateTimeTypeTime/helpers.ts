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
  /**
   * @deprecated Use timeOptions instead.
   * TODO: major - удалить обработку multiplicity* в useTimeItems,
   * формирование options { step: multiplicity } и оставить только timeOptions.
   */
  multiplicityHours?: number,
  /**
   * @deprecated Use timeOptions instead.
   * TODO: major - удалить обработку multiplicity* в useTimeItems,
   * формирование options { step: multiplicity } и оставить только timeOptions.
   */
  multiplicityMinutes?: number,
  /**
   * @deprecated Use timeOptions instead.
   * TODO: major - удалить обработку multiplicity* в useTimeItems,
   * формирование options { step: multiplicity } и оставить только timeOptions.
   */
  multiplicitySeconds?: number,
  onChange?: DateTimeTimePropOnChange,
  minDate?: Date,
  maxDate?: Date,
  disableDates?: DateTimePropDisableDates,
): ResultItem[][] => {
  const onChangeRef = useMutableRef(onChange);

  /**
   * @deprecated Use timeOptions instead.
   * TODO: major - удалить обработку multiplicity* в useTimeItems,
   * формирование options { step: multiplicity } и оставить только timeOptions.
   */
  const hoursOptions: TimeUnitOptions =
    timeOptions?.hours ??
    (multiplicityHours !== undefined ? { step: multiplicityHours } : {});
  /**
   * @deprecated Use timeOptions instead.
   * TODO: major - удалить обработку multiplicity* в useTimeItems,
   * формирование options { step: multiplicity } и оставить только timeOptions.
   */
  const minutesOptions: TimeUnitOptions =
    timeOptions?.minutes ??
    (multiplicityMinutes !== undefined ? { step: multiplicityMinutes } : {});
  /**
   * @deprecated Use timeOptions instead.
   * TODO: major - удалить обработку multiplicity* в useTimeItems,
   * формирование options { step: multiplicity } и оставить только timeOptions.
   */
  const secondsOptions: TimeUnitOptions =
    timeOptions?.seconds ??
    (multiplicitySeconds !== undefined ? { step: multiplicitySeconds } : {});

  const secondsItems = useMemo(
    () =>
      getItemData(
        'seconds',
        startOfMinute,
        startOfSecond,
        endOfSecond,
        addSeconds,
        getLabelSeconds,
        secondsOptions,
        value,
        minDate,
        maxDate,
        disableDates,
        onChangeRef,
      ),
    [
      value?.getTime(),
      minDate?.getTime(),
      maxDate?.getTime(),
      timeOptions,
      multiplicitySeconds,
      disableDates,
    ],
  );

  const minutesItems = useMemo(() => {
    const minutesOnChangeRef: React.MutableRefObject<
      DateTimeTimePropOnChange | undefined
    > = {
      current: (
        date: Date,
        props: { e: React.MouseEvent<HTMLButtonElement> },
      ) => {
        const firstAvailableSecond = secondsItems.find(
          (item) => !item.disabled,
        );
        if (firstAvailableSecond) {
          date.setSeconds(parseInt(firstAvailableSecond.label, 10));
        }
        onChangeRef.current?.(date, props);
      },
    };

    return getItemData(
      'minutes',
      startOfHour,
      startOfMinute,
      endOfMinute,
      addMinutes,
      getLabelMinutes,
      minutesOptions,
      value,
      minDate,
      maxDate,
      disableDates,
      minutesOnChangeRef,
    );
  }, [
    value?.getTime(),
    minDate?.getTime(),
    maxDate?.getTime(),
    timeOptions,
    multiplicityMinutes,
    disableDates,
  ]);

  const hoursItems = useMemo(() => {
    const hoursOnChangeRef: React.MutableRefObject<
      DateTimeTimePropOnChange | undefined
    > = {
      current: (
        date: Date,
        props: { e: React.MouseEvent<HTMLButtonElement> },
      ) => {
        const firstAvailableMinute = minutesItems.find(
          (item) => !item.disabled,
        );
        const firstAvailableSecond = secondsItems.find(
          (item) => !item.disabled,
        );

        if (firstAvailableMinute) {
          date.setMinutes(parseInt(firstAvailableMinute.label, 10));
        }
        if (firstAvailableSecond) {
          date.setSeconds(parseInt(firstAvailableSecond.label, 10));
        }
        onChangeRef.current?.(date, props);
      },
    };

    return getItemData(
      'hours',
      startOfDay,
      startOfHour,
      endOfHour,
      addHours,
      getLabelHours,
      hoursOptions,
      value,
      minDate,
      maxDate,
      disableDates,
      hoursOnChangeRef,
    );
  }, [
    value?.getTime(),
    minDate?.getTime(),
    maxDate?.getTime(),
    timeOptions,
    multiplicityHours,
    disableDates,
  ]);

  return [hoursItems, minutesItems, secondsItems];
};
