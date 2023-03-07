import {
  addMonths,
  endOfMonth,
  getYear,
  Locale,
  startOfMonth,
  startOfYear,
} from 'date-fns';
import React from 'react';

import { range } from '../../../utils/array';
import { isDisableDate, isInMinMaxDate } from '../../../utils/date';
import { DateRange } from '../../../utils/types/Date';
import { DateTimeCellPropRange } from '../DateTimeCell/DateTimeCell';
import { getMonthTitleAbbreviated } from './index';
import { isDateInRange } from './isDateInRange';
import { isEqualMount } from './isEqualMount';
import { DateTimePropDisableDates, HandleSelectDate } from './types';

const isSelected = ({
  date,
  value,
}: {
  date: Date;
  value?: Date | DateRange;
}): boolean => {
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.find((item) => (item ? isEqualMount(date, item) : false));
  }

  return isEqualMount(date, value);
};

const hasEvent = (date: Date, events: Date[]): boolean =>
  !!events.find((eventDate) => isEqualMount(eventDate, date));

const isCurrent = (date: Date): boolean => isEqualMount(new Date(), date);

export const getMonthsOfYear = (props: {
  date: Date;
  locale: Locale;
  onChange?: HandleSelectDate;
  value?: Date | DateRange;
  disableDates?: DateTimePropDisableDates;
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
  const {
    date,
    onChange,
    value,
    events,
    minDate,
    maxDate,
    locale,
    disableDates,
  } = props;
  const currentYear = getYear(date);
  const startDate = startOfYear(date);

  return range(12).map((index) => {
    const date = addMonths(startDate, index);
    const label = getMonthTitleAbbreviated(date, locale);
    const disabled =
      !isInMinMaxDate(date, minDate, maxDate, startOfMonth, endOfMonth) ||
      isDisableDate({ date, disableDates, mode: 'month' });
    const onClick =
      !disabled && onChange
        ? (e: React.MouseEvent<HTMLButtonElement>) =>
            onChange({ e, value: date })
        : undefined;
    if (getYear(date) === currentYear) {
      return {
        label,
        onClick,
        selected: isSelected({ date, value }),
        range: Array.isArray(value) && isDateInRange(date, value, startOfMonth),
        event: events && hasEvent(date, events),
        current: isCurrent(date),
        disabled,
      };
    }

    return {
      label,
      disabled: true,
    };
  });
};
