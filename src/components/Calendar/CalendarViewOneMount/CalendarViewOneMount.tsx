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

export const cnCalendarViewOneMount = cn('CalendarViewOneMount');

export const CalendarViewOneMount: CalendarViewComponent = React.forwardRef((props, ref) => {
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

  const mountLabel = getMouthLabelWithYear(currentVisibleDate, locale);
  const daysOfWeek = getDaysOfWeek(locale);
  const nextMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMountHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewOneMount({}, [className])}>
      <CalendarMountToggler
        prevOnClick={prevMountHandle}
        nextOnClick={nextMountHandle}
        label={mountLabel}
      />
      <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={daysOfMount} />
    </div>
  );
});
