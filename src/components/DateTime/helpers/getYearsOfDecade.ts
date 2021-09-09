import React from 'react';
import { addYears, format, getDecade, Locale, startOfDecade } from 'date-fns';

import { range } from '../../../utils/array';
import { isInMinMaxDade } from '../../../utils/date';
import { DateRange } from '../../../utils/types/Date';
import { DateTimeCellPropRange } from '../DateTimeCell/DateTimeCell';

import { isDateInRange } from './isDateInRange';
import { isEqualYear } from './isEqualYear';
import { HandleSelectDate } from './types';

const isSelected = ({ date, value }: { date: Date; value?: Date | DateRange }): boolean => {
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
  const { date, handleDayClick, value, events, minDate, maxDate } = props;
  const currentDecade = getDecade(date);
  const startDate = addYears(startOfDecade(date), -1);

  return range(12).map((index) => {
    const date = addYears(startDate, index);
    const label = format(date, 'yyyy');

    if (getDecade(date) === currentDecade) {
      return {
        label,
        onClick: handleDayClick
          ? (e: React.MouseEvent<HTMLDivElement>) => handleDayClick({ e, value: date })
          : undefined,
        selected: isSelected({ date, value }),
        range: Array.isArray(value) && isDateInRange(date, value),
        event: events && hasEvent(date, events),
        current: isCurrent(date),
        disabled: !isInMinMaxDade(date, minDate, maxDate),
      };
    }

    return {
      label,
      disabled: true,
    };
  });
};
