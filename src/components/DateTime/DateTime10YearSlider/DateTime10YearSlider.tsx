import './DateTime10YearSlider.css';

import {
  addYears,
  endOfDecade,
  format,
  getDecade,
  getYear,
  Locale,
  startOfDecade,
} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';

import { range } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { DateTimeSlider } from '../DateTimeSlider/DateTimeSlider';
import { getSliderValueRange } from '../helpers/getSliderValueRange';

export type DateTime10YearSliderProps = PropsWithHTMLAttributes<
  {
    currentVisibleDate: Date;
    onChange: (date: Date) => void;
    children?: never;
    value?: Date | DateRange;
    locale?: Locale;
  },
  HTMLDivElement
>;

export const cnDateTime10YearSlider = cn('DateTime10YearSlider');

const isCurrentVisibleDecade = (currentDate: Date, decade: Date) =>
  getDecade(currentDate) === getDecade(decade);

const isCurrentVisibleYear = (currentDate: Date, year: Date) =>
  isCurrentVisibleDecade(currentDate, year) &&
  getYear(currentDate) === getYear(year);

const getDecadeItems = (
  currentVisibleDate: Date,
  decade: Date,
  locale: Locale,
) =>
  range(10).map((year) => {
    const yearDate = addYears(decade, year);

    return {
      date: yearDate,
      label: format(yearDate, 'yyyy', { locale }),
      current: isCurrentVisibleYear(currentVisibleDate, yearDate),
    };
  });

const getSliderData = (
  currentVisibleDate: Date,
  value: Date | DateRange | undefined,
  locale: Locale,
) => {
  const currentDecade = startOfDecade(currentVisibleDate);

  return [
    addYears(currentDecade, -10),
    currentDecade,
    addYears(currentDecade, 10),
    addYears(currentDecade, 20),
  ].map((date) => ({
    label: `${format(date, 'yyyy', { locale })}-${format(
      addYears(date, 10),
      'yyyy',
      { locale },
    )}`,
    date,
    items: getDecadeItems(currentVisibleDate, date, locale),
    current: isCurrentVisibleDecade(currentVisibleDate, date),
    valueRange: getSliderValueRange(date, value, startOfDecade, endOfDecade),
  }));
};

export const DateTime10YearSlider: React.FC<DateTime10YearSliderProps> = (
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

  const handlePrev = () => onChange(addYears(currentVisibleDate, -10));
  const handleNext = () => onChange(addYears(currentVisibleDate, 10));

  const data = getSliderData(currentVisibleDate, value, locale);

  return (
    <DateTimeSlider
      className={cnDateTime10YearSlider(null, [className])}
      onNext={handleNext}
      onPrev={handlePrev}
      data={data}
      onChange={onChange}
      {...otherProps}
    />
  );
};
