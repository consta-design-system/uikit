import './DateTime100YearSlider.css';

import { addYears, format, getDecade, Locale } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React from 'react';

import { range } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { endOfCentury, getCentury, startOfCentury } from '../../../utils/date';
import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { DateTimeSlider } from '../DateTimeSlider/DateTimeSlider';
import { getSliderValueRange } from '../helpers/getSliderValueRange';

export type DateTime100YearSliderProps = PropsWithHTMLAttributes<
  {
    currentVisibleDate: Date;
    onChange: (date: Date) => void;
    children?: never;
    value?: Date | DateRange;
    locale?: Locale;
  },
  HTMLDivElement
>;

export const cnDateTime100YearSlider = cn('DateTime100YearSlider');

const isCurrentVisibleCentury = (currentDate: Date, century: Date) =>
  getCentury(currentDate) === getCentury(century);

const isCurrentVisibleDecade = (currentDate: Date, decade: Date) =>
  isCurrentVisibleCentury(currentDate, decade) &&
  getDecade(currentDate) === getDecade(decade);

const getCenturyItems = (
  currentVisibleDate: Date,
  decade: Date,
  locale: Locale,
) =>
  range(10).map((year) => {
    const yearDate = addYears(decade, year * 10);

    return {
      date: yearDate,
      label: format(yearDate, 'yyyy', { locale }),
      current: isCurrentVisibleDecade(currentVisibleDate, yearDate),
    };
  });

const getSliderData = (
  currentVisibleDate: Date,
  value: Date | DateRange | undefined,
  locale: Locale,
) => {
  const currentCentury = startOfCentury(currentVisibleDate);

  return [
    addYears(currentCentury, -100),
    currentCentury,
    addYears(currentCentury, 100),
    addYears(currentCentury, 200),
  ].map((date) => ({
    label: `${format(date, 'yyyy', { locale })}-${format(
      addYears(date, 100),
      'yyyy',
      { locale },
    )}`,
    date,
    items: getCenturyItems(currentVisibleDate, date, locale),
    current: isCurrentVisibleCentury(currentVisibleDate, date),
    valueRange: getSliderValueRange(date, value, startOfCentury, endOfCentury),
  }));
};

export const DateTime100YearSlider: React.FC<DateTime100YearSliderProps> = (
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

  const handlePrev = () => onChange(addYears(currentVisibleDate, -100));
  const handleNext = () => onChange(addYears(currentVisibleDate, 100));

  const data = getSliderData(currentVisibleDate, value, locale);

  return (
    <DateTimeSlider
      className={cnDateTime100YearSlider(null, [className])}
      onNext={handleNext}
      onPrev={handlePrev}
      data={data}
      onChange={onChange}
      {...otherProps}
    />
  );
};
