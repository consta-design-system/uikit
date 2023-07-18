import { addYears, startOfYear } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React, { forwardRef, useEffect } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { DateTime10Years } from '../DateTime10Years/DateTime10Years';
import { DateTime10YearSlider } from '../DateTime10YearSlider/DateTime10YearSlider';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import { DateTimeTypeYear } from '../DateTimeTypeYear/DateTimeTypeYear';
import { DateTimeYear } from '../DateTimeYear/DateTimeYear';
import {
  DateTimeTypeComponent,
  getHandleSelectDate,
  getMonthsOfYear,
  getYearTitle,
  isEqualMount,
  moveTypes,
  useCurrentVisibleDate,
} from '../helpers';
import { dateTimePropView, dateTimePropViewDefault } from '../helpers/types';
import { cnDateTimeMixLayout } from '../mixs';

export const DateTimeTypeMonth: DateTimeTypeComponent<'month'> = forwardRef(
  (props, ref) => {
    const {
      minDate,
      maxDate,
      value,
      onChange,
      onChangeRange,
      disableDates,
      currentVisibleDate: currentVisibleDateProp,
      events,
      locale = ruLocale,
      className,
      view = dateTimePropViewDefault,
      multiplicityHours,
      multiplicityMinutes,
      multiplicitySeconds,
      onMove,
      onChangeCurrentVisibleDate,
      ...otherProps
    } = props;

    const [changeYear, { on, off }] = useFlag();

    useEffect(() => {
      !changeYear && onMove?.(moveTypes[1]);
    }, [changeYear]);

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate,
      minDate,
      value,
      startOfUnit: startOfYear,
      onChangeCurrentVisibleDate,
    });

    if (changeYear) {
      return (
        <DateTimeTypeYear
          {...otherProps}
          ref={ref}
          className={className}
          currentVisibleDate={currentVisibleDate}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          events={events}
          view={view}
          onChange={({ value }) => {
            setCurrentVisibleDate(value);
            off();
          }}
          onMove={onMove}
        />
      );
    }

    const handleSelectDate = getHandleSelectDate({
      minDate,
      maxDate,
      value,
      onChange,
      onChangeRange,
      isEqualUnit: isEqualMount,
    });

    const pageOneMonthsOfYear = getMonthsOfYear({
      date: currentVisibleDate,
      onChange: handleSelectDate,
      value,
      events,
      disableDates,
      minDate,
      maxDate,
      locale,
    });

    const pageOneLabel = getYearTitle(currentVisibleDate);

    const handleNext = () =>
      setCurrentVisibleDate(addYears(currentVisibleDate, 1));
    const handlePrev = () =>
      setCurrentVisibleDate(addYears(currentVisibleDate, -1));

    if (view === dateTimePropView[0]) {
      return (
        <div
          {...otherProps}
          className={cnDateTimeMixLayout({ view }, [className])}
          ref={ref}
        >
          <DateTimeToggler
            className={cnDateTimeMixLayout('Label')}
            prevOnClick={handlePrev}
            nextOnClick={handleNext}
            label={pageOneLabel}
            onLabelClick={on}
          />
          <DateTimeYear years={pageOneMonthsOfYear} />
        </div>
      );
    }

    const pageTwoCurrentVisibleDate = addYears(currentVisibleDate, 1);

    const pageTwoLabel = getYearTitle(pageTwoCurrentVisibleDate);

    const pageTwoMonthsOfYear = getMonthsOfYear({
      date: pageTwoCurrentVisibleDate,
      onChange: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    if (view === dateTimePropView[1]) {
      return (
        <div
          {...otherProps}
          className={cnDateTimeMixLayout({ view }, [className])}
          ref={ref}
        >
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeToggler
              className={cnDateTimeMixLayout('Label')}
              prevOnClick={handlePrev}
              label={pageOneLabel}
              onLabelClick={on}
            />
            <DateTime10Years years={pageOneMonthsOfYear} />
          </div>
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeToggler
              className={cnDateTimeMixLayout('Label')}
              nextOnClick={handleNext}
              label={pageTwoLabel}
              onLabelClick={on}
            />
            <DateTime10Years years={pageTwoMonthsOfYear} />
          </div>
        </div>
      );
    }

    return (
      <div
        {...otherProps}
        className={cnDateTimeMixLayout({ view }, [className])}
        ref={ref}
      >
        <DateTime10YearSlider
          className={cnDateTimeMixLayout('Slider')}
          currentVisibleDate={currentVisibleDate}
          onChange={setCurrentVisibleDate}
          value={value}
          locale={locale}
        />
        <div className={cnDateTimeMixLayout('PageWrapper')}>
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeLabel
              className={cnDateTimeMixLayout('Label')}
              label={pageOneLabel}
              onClick={on}
              cursor="pointer"
            />
            <DateTime10Years years={pageOneMonthsOfYear} />
          </div>
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeLabel
              className={cnDateTimeMixLayout('Label')}
              label={pageTwoLabel}
              onClick={on}
              cursor="pointer"
            />
            <DateTime10Years years={pageTwoMonthsOfYear} />
          </div>
        </div>
      </div>
    );
  },
);
