import './CalendarViewSlider.css';

import React, { useState } from 'react';
import { addMonths } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cn } from '../../../utils/bem';
import { CalendarMount } from '../CalendarMount/CalendarMount';
import { CalendarMountLabel } from '../CalendarMountLabel/CalendarMountLabel';
import { CalendarSlider } from '../CalendarSlider/CalendarSlider';
import {
  calendarPropTypeDefault,
  CalendarViewComponent,
  getDaysOfMount,
  getDaysOfWeek,
  getHandleSelectDate,
  getMonthTitle,
} from '../helpers';

export const cnCalendarViewSlider = cn('CalendarViewSlider');

export const CalendarViewSlider: CalendarViewComponent = React.forwardRef((props, ref) => {
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
  const mountLabel = getMonthTitle(currentVisibleDate, locale);
  const nextMountLabel = getMonthTitle(addMonths(currentVisibleDate, 1), locale);
  const daysOfWeek = getDaysOfWeek(locale);

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewSlider({}, [className])}>
      <CalendarSlider
        className={cnCalendarViewSlider('Slider')}
        currentVisibleDate={currentVisibleDate}
        onChange={setCurrentVisibleDate}
        value={value}
        locale={locale}
      />
      <div className={cnCalendarViewSlider('CalendarsWrapper')}>
        <div className={cnCalendarViewSlider('Calendar')}>
          <CalendarMountLabel label={mountLabel} />
          <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={daysOfMount} />
        </div>
        <div className={cnCalendarViewSlider('Calendar')}>
          <CalendarMountLabel label={nextMountLabel} />
          <CalendarMount daysOfWeek={daysOfWeek} daysOfMount={nextDaysOfMount} />
        </div>
      </div>
    </div>
  );
});
