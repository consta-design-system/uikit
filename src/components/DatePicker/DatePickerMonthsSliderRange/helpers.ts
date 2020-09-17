import { addMonths, differenceInCalendarMonths, getDaysInMonth } from 'date-fns';

import { range } from '../../../utils/array';
import { DateRange, MinMaxDate, ValueProps } from '../types';

export const getMonths = ({ minDate, maxDate }: MinMaxDate): Date[] => {
  const monthAmount = differenceInCalendarMonths(maxDate, minDate) + 1;

  return range(monthAmount).map((i) => addMonths(minDate, i));
};

export const getBaseDate = (value?: DateRange): Date | undefined => {
  const [startDate, endDate] = value || [];

  return startDate || endDate;
};

export const getDateOffsetOnTimeline = ({
  date,
  minDate,
  tickWidth,
}: {
  date: Date;
  tickWidth: number;
} & Pick<MinMaxDate, 'minDate'>): number => {
  const startDay = date.getDate();
  const monthsOffsetPx = differenceInCalendarMonths(date, minDate) * tickWidth;
  const daysOffsetPx = (tickWidth * startDay) / getDaysInMonth(date);

  return Math.round(monthsOffsetPx + daysOffsetPx);
};

export const getSelectedDayWidth = (date: Date, tickWidth: number): number => {
  return Math.max(Math.round(tickWidth / getDaysInMonth(date)), 1);
};

export const getSelectedBlockStyles = ({
  value = [],
  minDate,
  tickWidth,
}: {
  tickWidth: number;
} & ValueProps<DateRange> &
  Pick<MinMaxDate, 'minDate'>): { left?: number; width?: number } => {
  const baseDate = getBaseDate(value);

  if (!baseDate) {
    return {
      width: 0,
    };
  }

  const [startDate, endDate] = value;

  if (startDate && endDate) {
    const leftCorner = getDateOffsetOnTimeline({
      date: startDate,
      minDate,
      tickWidth,
    });
    const rightCorner = getDateOffsetOnTimeline({
      date: endDate,
      minDate,
      tickWidth,
    });

    return {
      left: leftCorner,
      width: Math.max(rightCorner - leftCorner, 1) + getSelectedDayWidth(endDate, tickWidth),
    };
  }

  return {
    left: getDateOffsetOnTimeline({
      date: baseDate,
      minDate,
      tickWidth,
    }),
    width: Math.max(getSelectedDayWidth(baseDate, tickWidth), 1),
  };
};
