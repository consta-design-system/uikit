import './DateTimeYearSlider.css';

import {
  addMonths,
  addYears,
  endOfYear,
  format,
  getMonth,
  getYear,
  Locale,
  startOfYear,
} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';

import { range } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { DateTimeSlider } from '../DateTimeSlider/DateTimeSlider';
import { getMonthTitleAbbreviated } from '../helpers';
import { getSliderValueRange } from '../helpers/getSliderValueRange';

export type DateTimeYearSliderProps = PropsWithHTMLAttributes<
  {
    currentVisibleDate: Date;
    onChange: (date: Date) => void;
    children?: never;
    value?: Date | DateRange;
    locale?: Locale;
  },
  HTMLDivElement
>;

export const cnDateTimeYearSlider = cn('DateTimeYearSlider');

const isCurrentVisibleYear = (currentDate: Date, month: Date) =>
  getYear(currentDate) === getYear(month);

const isCurrentVisibleMonth = (currentDate: Date, month: Date) =>
  isCurrentVisibleYear(currentDate, month) &&
  getMonth(currentDate) === getMonth(month);

const getYearItems = (currentVisibleDate: Date, date: Date, locale: Locale) =>
  range(12).map((month) => {
    const monthDate = addMonths(date, month);
    return {
      date: monthDate,
      label: getMonthTitleAbbreviated(monthDate, locale),
      current: isCurrentVisibleMonth(currentVisibleDate, monthDate),
    };
  });

const getSliderData = (
  currentVisibleDate: Date,
  value: Date | DateRange | undefined,
  locale: Locale,
) => {
  const currentYear = startOfYear(currentVisibleDate);

  return [
    addYears(currentYear, -1),
    currentYear,
    addYears(currentYear, 1),
    addYears(currentYear, 2),
  ].map((date) => ({
    label: format(date, 'yyyy', { locale }),
    date,
    items: getYearItems(currentVisibleDate, date, locale),
    current: isCurrentVisibleYear(currentVisibleDate, date),
    valueRange: getSliderValueRange(date, value, startOfYear, endOfYear),
  }));
};

export const DateTimeYearSlider: React.FC<DateTimeYearSliderProps> = (
  props,
) => {
  const {
    currentVisibleDate,
    className,
    onChange,
    value,
    locale = ruLocale,
    ...otherProps
  } = props;

  const handlePrev = () => onChange(addYears(currentVisibleDate, -1));
  const handleNext = () => onChange(addYears(currentVisibleDate, 1));

  const data = getSliderData(currentVisibleDate, value, locale);

  return (
    <DateTimeSlider
      className={cnDateTimeYearSlider(null, [className])}
      onNext={handleNext}
      onPrev={handlePrev}
      data={data}
      onChange={onChange}
      {...otherProps}
    />
  );
};
