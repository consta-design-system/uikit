import React from 'react';
import {
  addDays,
  addWeeks,
  differenceInDays,
  endOfDay,
  endOfWeek,
  format,
  Locale,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { range } from '../../../utils/array';
import { isInMinMaxDade } from '../../../utils/date';
import { DateRange } from '../../../utils/types/Date';
import { DateTimeCellPropRange } from '../DateTimeCell/DateTimeCell';

import { isDateInRange } from './isDateInRange';
import { isEqualDay } from './isEqualDay';
import { HandleSelectDate } from './types';

const isSelected = ({ date, value }: { date: Date; value?: Date | DateRange }): boolean => {
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.find((item) => (item ? isEqualDay(date, item) : false));
  }

  return isEqualDay(date, value);
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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  selected?: boolean;
  range?: DateTimeCellPropRange;
  event?: boolean;
  current?: boolean;
}[] => {
  const { date, locale, handleDayClick, value, events, minDate, maxDate } = props;
  const currentMonth = date.getMonth();
  const startDate = startOfWeek(startOfMonth(date), { locale });
  const endDate = endOfWeek(addWeeks(startDate, 5), { locale });
  const diffDays = differenceInDays(endDate, startDate) + 1;

  return range(diffDays).map((index) => {
    const date = addDays(startDate, index);
    const label = format(date, 'd');
    const disabled = !isInMinMaxDade(date, minDate, maxDate, startOfDay, endOfDay);
    const onClick =
      !disabled && handleDayClick
        ? (e: React.MouseEvent<HTMLButtonElement>) => handleDayClick({ e, value: date })
        : undefined;

    if (date.getMonth() === currentMonth) {
      return {
        label,
        onClick,
        selected: isSelected({ date, value }),
        range: Array.isArray(value) && isDateInRange(date, value),
        event: events && hasEvent(date, events),
        current: isToday(date),
        disabled,
      };
    }

    return {
      label,
      disabled: true,
    };
  });
};
