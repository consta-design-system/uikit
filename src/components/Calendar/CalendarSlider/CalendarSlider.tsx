import './CalendarSlider.css';

import React, { useEffect, useRef } from 'react';
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

import { IconForward } from '../../../icons/IconForward/IconForward';
import { range } from '../../../utils/array';
import { cn } from '../../../utils/bem';
import { DateRange } from '../../../utils/types/Date';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

export type CalendarSliderProps = PropsWithHTMLAttributes<
  {
    currentVisibleDate: Date;
    onChange: (date: Date) => void;
    children?: never;
    value?: Date | DateRange;
    locale?: Locale;
  },
  HTMLDivElement
>;

export const cnCalendarSlider = cn('CalendarSlider');

const isCurrentVisibleYear = (currentDate: Date, mount: Date) =>
  getYear(currentDate) === getYear(mount);

const isCurrentVisibleMount = (currentDate: Date, mount: Date) =>
  isCurrentVisibleYear(currentDate, mount) && getMonth(currentDate) === getMonth(mount);

const getValueRange = (yearDate: Date, value?: Date | DateRange) => {
  if (!Array.isArray(value)) {
    return undefined;
  }

  if (!value[0] || !value[1]) {
    return undefined;
  }

  const yearStartDateTime = startOfYear(yearDate).getTime();
  const yearEndDateTime = endOfYear(yearDate).getTime();
  const valueStartDateTime = value[0].getTime();
  const valueEndDateTime = value[1].getTime();

  if (valueStartDateTime > yearEndDateTime || valueEndDateTime < yearStartDateTime) {
    return undefined;
  }

  if (valueStartDateTime <= yearStartDateTime && valueEndDateTime >= yearEndDateTime) {
    return [0, 100];
  }

  const msInYear = yearEndDateTime - yearStartDateTime;
  const inProcent = (number: number) => (number / msInYear) * 100;
  const offset = Math.floor(
    inProcent(valueStartDateTime <= yearStartDateTime ? 0 : valueStartDateTime - yearStartDateTime),
  );

  const minusYears = (n: number): number => {
    if (n > msInYear) {
      const newNumber = n - msInYear;
      return minusYears(newNumber);
    }

    return n;
  };

  const width = Math.ceil(
    valueEndDateTime >= yearEndDateTime
      ? 100 - offset
      : inProcent(minusYears(valueEndDateTime - valueStartDateTime)),
  );

  return [offset, width];
};

const getMonthsData = (date: Date, locale: Locale) =>
  range(12).map((mount) => {
    const mountDate = addMonths(date, mount);
    return {
      date: mountDate,
      label: format(mountDate, 'MMM', { locale }),
    };
  });

const getYearDate = (date: Date) => new Date(getYear(date), 0, 1, 0, 0, 0, 0);

const getSliderData = (date: Date, value: Date | DateRange | undefined, locale: Locale) => {
  const currentYear = getYearDate(date);

  return [
    addYears(currentYear, -1),
    currentYear,
    addYears(currentYear, 1),
    addYears(currentYear, 2),
  ].map((date, index) => ({
    label: format(date, 'yyyy', { locale }),
    date,
    mounths: getMonthsData(date, locale),
    positon: `${index}`,
    valueRange: getValueRange(date, value),
  }));
};

export const CalendarSlider: React.FC<CalendarSliderProps> = (props) => {
  const {
    currentVisibleDate,
    className,
    onChange,
    value,
    locale = ruLocale,
    ...otherProps
  } = props;

  const currentMountRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => onChange(addYears(currentVisibleDate, -1));
  const handleNext = () => onChange(addYears(currentVisibleDate, 1));

  useEffect(() => {
    if (currentMountRef.current && sliderRef.current) {
      sliderRef.current.style.setProperty(
        '--selector-offset',
        `${currentMountRef.current.offsetLeft}px`,
      );
    }
  }, [currentVisibleDate]);

  const data = getSliderData(currentVisibleDate, value, locale);

  return (
    <div {...otherProps} className={cnCalendarSlider(null, [className])}>
      <Button
        className={cnCalendarSlider('Button', { direction: 'prev' })}
        view="ghost"
        iconLeft={IconForward}
        onClick={handlePrev}
      />
      <div className={cnCalendarSlider('Slider')} ref={sliderRef}>
        <div className={cnCalendarSlider('SliderBody')}>
          <div className={cnCalendarSlider('Selector')} />
          {data.map((year) => (
            <Text
              className={cnCalendarSlider('YearLabel', { position: year.positon })}
              weight="bold"
              size="s"
              key={year.label}
              view={isCurrentVisibleYear(currentVisibleDate, year.date) ? undefined : 'ghost'}
            >
              {year.label}
            </Text>
          ))}
          {data.map((year) => (
            <div
              key={year.label}
              className={cnCalendarSlider('Year', {
                position: year.positon,
                selected: !!year.valueRange,
              })}
              style={
                year.valueRange && {
                  ['--value-offset' as string]: `${year.valueRange[0]}%`,
                  ['--value-width' as string]: `${year.valueRange[1]}%`,
                }
              }
            >
              {year.mounths.map((mounth, index) => (
                <div
                  className={cnCalendarSlider('Mounth')}
                  key={index}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex={0}
                  onClick={() => onChange(mounth.date)}
                  onKeyDown={() => onChange(addMonths(mounth.date, 1))}
                  ref={
                    isCurrentVisibleMount(currentVisibleDate, mounth.date) ? currentMountRef : null
                  }
                  role="button"
                >
                  <Text
                    className={cnCalendarSlider('MounthLabel')}
                    size="2xs"
                    view="ghost"
                    align="center"
                  >
                    {mounth.label}
                  </Text>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button
        className={cnCalendarSlider('Button', { direction: 'next' })}
        view="ghost"
        iconLeft={IconForward}
        onClick={handleNext}
      />
    </div>
  );
};
