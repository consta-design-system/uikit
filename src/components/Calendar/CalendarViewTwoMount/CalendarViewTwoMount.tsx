import './CalendarViewTwoMount.css';

import React, { useState } from 'react';
import { addMonths } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cn } from '../../../utils/bem';
import { CalendarMount } from '../CalendarMount/CalendarMount';
import { CalendarMountToggler } from '../CalendarMountToggler/CalendarMountToggler';
import {
  calendarPropTypeDefault,
  CalendarViewComponent,
  getDaysOfMount,
  getDaysOfWeek,
  getHandleSelectDate,
  getMouthLabelWithYear,
} from '../helpers';

export const cnCalendarViewTwoMount = cn('CalendarViewTwoMount');

export const CalendarViewTwoMount: CalendarViewComponent = React.forwardRef((props, ref) => {
  const {
    className,
    type = calendarPropTypeDefault,
    minDate,
    maxDate,
    value,
    onChange,
    currentVisibleDate: currentVisibleDateProp = new Date(),
    events,
    locale = ruLocale,
    ...otherProps
  } = props;
  const [currentVisibleDate, setCurrentVisibleDate] = useState(currentVisibleDateProp);

  const handleSelectDate = getHandleSelectDate({ type, minDate, maxDate, value, onChange });

  const daysOfMount = getDaysOfMount({
    date: currentVisibleDate,
    handleDayClick: handleSelectDate,
    value,
    events,
    minDate,
    maxDate,
    locale,
  });

  const nextDaysOfMount = getDaysOfMount({
    date: addMonths(currentVisibleDate, 1),
    handleDayClick: handleSelectDate,
    value,
    events,
    minDate,
    maxDate,
    locale,
  });

  const mountLabel = getMouthLabelWithYear(currentVisibleDate, locale);
  const nextMountLabel = getMouthLabelWithYear(addMonths(currentVisibleDate, 1), locale);
  const daysOfWeek = getDaysOfWeek(locale);

  const nextMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewTwoMount({}, [className])}>
      <div className={cnCalendarViewTwoMount('Calendar')}>
        <CalendarMountToggler prevOnClick={prevMountHandle} label={mountLabel} />
        <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={daysOfMount} />
      </div>
      <div className={cnCalendarViewTwoMount('Calendar')}>
        <CalendarMountToggler nextOnClick={nextMountHandle} label={nextMountLabel} />
        <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={nextDaysOfMount} />
      </div>
    </div>
  );
});
