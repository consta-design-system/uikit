import './DateTimeViewTwoMonths.css';

import React from 'react';
import { addMonths } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cn } from '../../../utils/bem';
import { DateTimeMonth } from '../DateTimeMonth/DateTimeMonth';
import { DateTimeMonthToggler } from '../DateTimeMonthToggler/DateTimeMonthToggler';
import {
  DateTimeViewComponent,
  getDaysOfMonth,
  getDaysOfWeek,
  getHandleSelectDate,
  getMouthLabelWithYear,
  useCurrentVisibleDate,
} from '../helpers';

export const cnDateTimeViewTwoMonths = cn('DateTimeViewTwoMonths');

export const DateTimeViewTwoMonths: DateTimeViewComponent = React.forwardRef((props, ref) => {
  const {
    className,
    minDate,
    maxDate,
    value,
    onChange,
    onChangeRange,
    currentVisibleDate: currentVisibleDateProp = new Date(),
    events,
    locale = ruLocale,
    ...otherProps
  } = props;

  const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
    currentVisibleDate: currentVisibleDateProp,
    maxDate,
    minDate,
    value,
  });

  const handleSelectDate = getHandleSelectDate({
    minDate,
    maxDate,
    value,
    onChange,
    onChangeRange,
  });

  const daysOfMonth = getDaysOfMonth({
    date: currentVisibleDate,
    handleDayClick: handleSelectDate,
    value,
    events,
    minDate,
    maxDate,
    locale,
  });

  const nextDaysOfMonth = getDaysOfMonth({
    date: addMonths(currentVisibleDate, 1),
    handleDayClick: handleSelectDate,
    value,
    events,
    minDate,
    maxDate,
    locale,
  });

  const monthLabel = getMouthLabelWithYear(currentVisibleDate, locale);
  const nextMonthLabel = getMouthLabelWithYear(addMonths(currentVisibleDate, 1), locale);
  const daysOfWeek = getDaysOfWeek(locale);

  const nextMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  return (
    <div {...otherProps} ref={ref} className={cnDateTimeViewTwoMonths({}, [className])}>
      <div className={cnDateTimeViewTwoMonths('Calendar')}>
        <DateTimeMonthToggler prevOnClick={prevMonthHandle} label={monthLabel} />
        <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} />
      </div>
      <div className={cnDateTimeViewTwoMonths('Calendar')}>
        <DateTimeMonthToggler nextOnClick={nextMonthHandle} label={nextMonthLabel} />
        <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={nextDaysOfMonth} />
      </div>
    </div>
  );
});
