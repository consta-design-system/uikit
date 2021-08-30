import React, { useEffect, useMemo, useState } from 'react';
import {
  addDays,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  Locale,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

import { range } from '../../../utils/array';
import { isDateRange, isInMinMaxDade, isOnlyOneDateInRange } from '../../../utils/date';
import { isDefined } from '../../../utils/type-guards';
import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import { DateTimeCellPropRange } from '../DateTimeCell/DateTimeCell';

export const DateTimePropView = ['oneMonth', 'twoMonths', 'slider'] as const;
export type DateTimePropView = typeof DateTimePropView[number];
export const DateTimePropViewDefault: DateTimePropView = DateTimePropView[0];

export const DateTimePropType = ['date'] as const;
export type DateTimePropType = typeof DateTimePropType[number];
export const DateTimePropTypeDefault: DateTimePropType = DateTimePropType[0];

export type DateTimePropValue = Date | DateRange;

export type DateTimePropOnChange = (props: {
  value: Date;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;

export type DateTimePropOnChangeRange = (props: {
  value: DateRange;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;

export type DateTimeProps = PropsWithHTMLAttributesAndRef<
  {
    currentVisibleDate?: Date;
    type?: DateTimePropType;
    value?: DateTimePropValue;
    onChange?: DateTimePropOnChange;
    onChangeRange?: DateTimePropOnChangeRange;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    view?: DateTimePropView;
    locale?: Locale;
  },
  HTMLDivElement
>;

export type DateTimeComponent = (props: DateTimeProps) => React.ReactElement | null;

export type DateTimeViewComponent = (
  props: Omit<DateTimeProps, 'view'>,
) => React.ReactElement | null;

const isEqualDate = (date1: Date, date2: Date): boolean => date1.getTime() === date2.getTime();

const isEqualDay = (date1: Date, date2: Date): boolean =>
  isEqualDate(startOfDay(date1), startOfDay(date2));

export const dateComparer = (a?: Date, b?: Date): number =>
  (a?.getTime() ?? 0) - (b?.getTime() ?? 0);

export const getStartAndEndDate = (date1: Date, date2: Date): Date[] =>
  [date1, date2].sort(dateComparer);

export const isDateSelected = ({ date, value }: { date: Date; value?: Date }): boolean => {
  return value ? isSameDay(value, date) : false;
};

export const isValueSelected = ({
  date,
  value,
}: {
  date: Date;
  value?: Date | DateRange;
}): boolean => {
  if (isDateRange(value)) {
    if (value[0] && value[1]) {
      const [start, end] = getStartAndEndDate(value[0], value[1]);
      return isWithinInterval(date, { start, end });
    }

    return isDateSelected({ date, value: value[0] || value[1] });
  }
  return isDateSelected({ date, value });
};

export const isValueSelectedBackwards = ({
  value,
  hoveredDate,
}: {
  value?: Date | DateRange;
  hoveredDate?: Date;
}): boolean | undefined => {
  return (
    hoveredDate &&
    isDateRange(value) &&
    isOnlyOneDateInRange(value) &&
    ((isDefined(value[0]) && isBefore(hoveredDate, value[0])) ||
      (isDefined(value[1]) && isBefore(hoveredDate, value[1])))
  );
};

const isSelected = ({ date, value }: { date: Date; value?: Date | DateRange }): boolean => {
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.find((item) => (item ? isEqualDay(date, item) : false));
  }

  return isEqualDay(date, value);
};

const isDateInRange = (date: Date, range: DateRange): DateTimeCellPropRange => {
  if (!range[0] || !range[1]) {
    return false;
  }

  const dateTime = date.getTime();
  const rangeTime = [range[0].getTime(), range[1].getTime()];

  if (dateTime === rangeTime[0]) {
    return 'first';
  }

  if (dateTime === rangeTime[1]) {
    return 'last';
  }

  if (dateTime > rangeTime[0] && dateTime < rangeTime[1]) {
    return true;
  }

  return false;
};

const hasEvent = (date: Date, events: Date[]): boolean =>
  !!events.find((eventDate) => isEqualDay(eventDate, date));

const isToday = (date: Date): boolean => isEqualDay(new Date(), date);

export const getDaysOfMonth = (props: {
  date: Date;
  locale: Locale;
  handleDayClick?: HandleSelectDate;
  value?: Date | DateRange;
  events?: Date[];
  minDate?: Date;
  maxDate?: Date;
}): {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  label: string;
  selected?: boolean;
  range?: DateTimeCellPropRange;
  event?: boolean;
  current?: boolean;
}[] => {
  const { date, locale, handleDayClick, value, events, minDate, maxDate } = props;
  const currentMonth = date.getMonth();
  const startDate = startOfWeek(startOfMonth(date), { locale });
  const endDate = endOfWeek(endOfMonth(date), { locale });
  const diffDays = differenceInDays(endDate, startDate) + 1;

  return range(diffDays).map((index) => {
    const date = addDays(startDate, index);
    const label = format(date, 'd');

    if (date.getMonth() === currentMonth) {
      return {
        label,
        onClick: handleDayClick
          ? (e: React.MouseEvent<HTMLDivElement>) => handleDayClick({ e, value: date })
          : undefined,
        selected: isSelected({ date, value }),
        range: Array.isArray(value) && isDateInRange(date, value),
        event: events && hasEvent(date, events),
        current: isToday(date),
        disabled: !isInMinMaxDade(date, minDate, maxDate),
      };
    }

    return {
      label,
      disabled: true,
    };
  });
};

type GetHandleSelectDateProps = {
  value?: DateTimePropValue;
  onChange?: DateTimePropOnChange;
  onChangeRange?: DateTimePropOnChangeRange;
  minDate?: Date;
  maxDate?: Date;
};

type HandleSelectDate = (props: { value: Date; e: React.MouseEvent<HTMLDivElement> }) => void;

export function getHandleSelectDate(props: GetHandleSelectDateProps): HandleSelectDate {
  return (callbackProps) => {
    if (!isInMinMaxDade(callbackProps.value, props.minDate, props.maxDate)) {
      return;
    }

    if (typeof props.onChange === 'function') {
      props.onChange(callbackProps);
    }

    if (typeof props.onChangeRange === 'function') {
      const currentValue: DateRange = (Array.isArray(props.value)
        ? props.value
        : [props.value, undefined]) || [undefined, undefined];

      const [startDate, endDate] = currentValue;

      if (isDefined(startDate) && isEqualDay(startDate, callbackProps.value)) {
        return props.onChangeRange({
          e: callbackProps.e,
          value: [endDate, undefined],
        });
      }

      if (isDefined(endDate) && isEqualDay(endDate, callbackProps.value)) {
        return props.onChangeRange({
          e: callbackProps.e,
          value: [startDate, undefined],
        });
      }

      if (isDefined(startDate)) {
        return props.onChangeRange({
          e: callbackProps.e,
          value:
            startDate > callbackProps.value
              ? [callbackProps.value, startDate]
              : [startDate, callbackProps.value],
        });
      }

      if (isDefined(endDate)) {
        return props.onChangeRange({
          e: callbackProps.e,
          value:
            endDate > callbackProps.value
              ? [callbackProps.value, endDate]
              : [endDate, callbackProps.value],
        });
      }

      props.onChangeRange({ e: callbackProps.e, value: [callbackProps.value, undefined] });
    }
  };
}

export const getMonthTitle = (date: Date, locale: Locale): string => {
  return format(date, 'LLLL', { locale });
};

export const getMouthLabelWithYear = (date: Date, locale: Locale): string => {
  return `${getMonthTitle(date, locale)} ${date.getFullYear()}`;
};

export const getDaysOfWeek = (locale: Locale): string[] => {
  const now = new Date();

  return eachDayOfInterval({
    start: startOfWeek(now, { locale }),
    end: endOfWeek(now, { locale }),
  }).map((date) => format(date, 'EEEEEE', { locale }));
};

type GetCurrentVisibleDateProps = {
  currentVisibleDate: Date | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  value: Date | DateRange | undefined;
};

const getCurrentVisibleDate = ({
  currentVisibleDate,
  minDate,
  maxDate,
  value,
}: GetCurrentVisibleDateProps): Date => {
  const currentDate = new Date();
  if (currentVisibleDate) {
    return currentVisibleDate;
  }
  if (Array.isArray(value) && value[0]) {
    return value[0];
  }
  if (Array.isArray(value) && value[1]) {
    return value[1];
  }
  if (value && !Array.isArray(value)) {
    return value;
  }

  if (minDate && maxDate && !isDateInRange(currentDate, [minDate, maxDate])) {
    return minDate;
  }
  if (minDate && !maxDate) {
    const minDateTime = minDate.getTime();
    const currentDateTime = currentDate.getTime();
    if (currentDateTime < minDateTime) {
      return minDate;
    }
  }
  if (!minDate && maxDate) {
    const maxDateTime = maxDate.getTime();
    const currentDateTime = currentDate.getTime();
    if (currentDateTime > maxDateTime) {
      return maxDate;
    }
  }

  return currentDate;
};

export const useCurrentVisibleDate = (props: GetCurrentVisibleDateProps) => {
  const currentVisibleDate = useMemo(() => {
    return startOfMonth(getCurrentVisibleDate(props));
  }, [
    props.currentVisibleDate?.getTime() || 0,
    props.minDate?.getTime() || 0,
    props.maxDate?.getTime() || 0,
  ]);

  const state = useState(currentVisibleDate);

  useEffect(() => state[1](currentVisibleDate), [currentVisibleDate.getTime()]);

  return state;
};
