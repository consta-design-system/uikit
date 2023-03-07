import {
  addYears,
  endOfYear,
  format,
  getDecade,
  Locale,
  startOfDecade,
  startOfYear,
} from 'date-fns';
import React from 'react';

import { range } from '../../../utils/array';
import { isDisableDate, isInMinMaxDate } from '../../../utils/date';
import { DateRange } from '../../../utils/types/Date';
import { DateTimeCellPropRange } from '../DateTimeCell/DateTimeCell';
import { isDateInRange } from './isDateInRange';
import { isEqualYear } from './isEqualYear';
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
    return !!value.find((item) => (item ? isEqualYear(date, item) : false));
  }

  return isEqualYear(date, value);
};

const hasEvent = (date: Date, events: Date[]): boolean =>
  !!events.find((eventDate) => isEqualYear(eventDate, date));

const isCurrent = (date: Date): boolean => isEqualYear(new Date(), date);

export const getYearsOfDecade = (props: {
  date: Date;
  locale: Locale;
  onChange?: HandleSelectDate;
  value?: Date | DateRange;
  events?: Date[];
  disableDates?: DateTimePropDisableDates;
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
  const { date, onChange, value, events, minDate, maxDate, disableDates } =
    props;
  const currentDecade = getDecade(date);
  const startDate = addYears(startOfDecade(date), -1);

  return range(12).map((index) => {
    const date = addYears(startDate, index);
    const label = format(date, 'yyyy');
    const disabled =
      !isInMinMaxDate(date, minDate, maxDate, startOfYear, endOfYear) ||
      isDisableDate({ date, disableDates, mode: 'year' });
    const onClick =
      !disabled && onChange
        ? (e: React.MouseEvent<HTMLButtonElement>) =>
            onChange({ e, value: date })
        : undefined;
    if (getDecade(date) === currentDecade) {
      return {
        label,
        onClick,
        selected: isSelected({ date, value }),
        range: Array.isArray(value) && isDateInRange(date, value, startOfYear),
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
