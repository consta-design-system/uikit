import { addMonths, startOfMonth } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import React, { forwardRef, useEffect } from 'react';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { DateTimeMonth } from '../DateTimeMonth/DateTimeMonth';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import { DateTimeTypeMonth } from '../DateTimeTypeMonth/DateTimeTypeMonth';
import { DateTimeYearSlider } from '../DateTimeYearSlider/DateTimeYearSlider';
import {
  DateTimeTypeComponent,
  getDaysOfMonth,
  getDaysOfWeek,
  getHandleSelectDate,
  getMouthLabelWithYear,
  isEqualDay,
  moveTypes,
  useCurrentVisibleDate,
} from '../helpers';
import { dateTimePropView, dateTimePropViewDefault } from '../helpers/types';
import { cnDateTimeMixLayout } from '../mixs';

export const DateTimeTypeDate: DateTimeTypeComponent<'date'> = forwardRef(
  (props, ref) => {
    const {
      className,
      minDate,
      maxDate,
      value,
      disableDates,
      onChange,
      onChangeRange,
      currentVisibleDate: currentVisibleDateProp,
      events,
      locale = ruLocale,
      view = dateTimePropViewDefault,
      multiplicityHours,
      multiplicityMinutes,
      multiplicitySeconds,
      onMove,
      onChangeCurrentVisibleDate,
      ...otherProps
    } = props;

    const [changeMonth, setChangeMonth] = useFlag();

    useEffect(() => {
      !changeMonth && onMove?.(moveTypes[2]);
    }, [changeMonth]);

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate,
      minDate,
      value,
      startOfUnit: startOfMonth,
      onChangeCurrentVisibleDate,
    });

    if (changeMonth) {
      return (
        <DateTimeTypeMonth
          {...otherProps}
          ref={ref}
          className={className}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          events={events}
          currentVisibleDate={currentVisibleDate}
          view={view}
          onChange={({ value }) => {
            setCurrentVisibleDate(value);
            setChangeMonth.off();
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
      isEqualUnit: isEqualDay,
    });

    const pageOneDaysOfMonth = getDaysOfMonth({
      date: currentVisibleDate,
      disableDates,
      handleDayClick: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    const pageOneLabel = getMouthLabelWithYear(currentVisibleDate, locale);

    const daysOfWeek = getDaysOfWeek(locale);

    const nextMonthHandle = () =>
      setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
    const prevMonthHandle = () =>
      setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

    if (view === dateTimePropView[0]) {
      return (
        <div
          {...otherProps}
          ref={ref}
          className={cnDateTimeMixLayout({ view }, [className])}
        >
          <DateTimeToggler
            className={cnDateTimeMixLayout('Label')}
            prevOnClick={prevMonthHandle}
            nextOnClick={nextMonthHandle}
            label={pageOneLabel}
            onLabelClick={setChangeMonth.on}
          />
          <DateTimeMonth
            daysOfWeek={daysOfWeek}
            daysOfMonth={pageOneDaysOfMonth}
          />
        </div>
      );
    }

    const pageTwoCurrentVisibleDate = addMonths(currentVisibleDate, 1);

    const pageTwoDaysOfMonth = getDaysOfMonth({
      date: pageTwoCurrentVisibleDate,
      handleDayClick: handleSelectDate,
      value,
      events,
      minDate,
      maxDate,
      locale,
    });

    const pageTwoLabel = getMouthLabelWithYear(
      pageTwoCurrentVisibleDate,
      locale,
    );

    if (view === dateTimePropView[1]) {
      return (
        <div
          {...otherProps}
          ref={ref}
          className={cnDateTimeMixLayout({ view }, [className])}
        >
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeToggler
              className={cnDateTimeMixLayout('Label')}
              prevOnClick={prevMonthHandle}
              label={pageOneLabel}
              onLabelClick={setChangeMonth.on}
            />
            <DateTimeMonth
              daysOfWeek={daysOfWeek}
              daysOfMonth={pageOneDaysOfMonth}
            />
          </div>
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeToggler
              className={cnDateTimeMixLayout('Label')}
              nextOnClick={nextMonthHandle}
              label={pageTwoLabel}
              onLabelClick={setChangeMonth.on}
            />
            <DateTimeMonth
              daysOfWeek={daysOfWeek}
              daysOfMonth={pageTwoDaysOfMonth}
            />
          </div>
        </div>
      );
    }

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnDateTimeMixLayout({ view }, [className])}
      >
        <DateTimeYearSlider
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
              onClick={setChangeMonth.on}
              cursor="pointer"
            />
            <DateTimeMonth
              daysOfWeek={daysOfWeek}
              daysOfMonth={pageOneDaysOfMonth}
            />
          </div>
          <div className={cnDateTimeMixLayout('Page')}>
            <DateTimeLabel
              className={cnDateTimeMixLayout('Label')}
              label={pageTwoLabel}
              onClick={setChangeMonth.on}
              cursor="pointer"
            />
            <DateTimeMonth
              daysOfWeek={daysOfWeek}
              daysOfMonth={pageTwoDaysOfMonth}
            />
          </div>
        </div>
      </div>
    );
  },
);
