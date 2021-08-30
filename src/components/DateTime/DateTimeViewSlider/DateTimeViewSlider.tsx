import './DateTimeViewSlider.css';

import React from 'react';
import { addMonths } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cn } from '../../../utils/bem';
import { DateTimeMonth } from '../DateTimeMonth/DateTimeMonth';
import { DateTimeMonthLabel } from '../DateTimeMonthLabel/DateTimeMonthLabel';
import { DateTimeYearSlider } from '../DateTimeYearSlider/DateTimeYearSlider';
import {
  DateTimeViewComponent,
  getDaysOfMonth,
  getDaysOfWeek,
  getHandleSelectDate,
  getMonthTitle,
  useCurrentVisibleDate,
} from '../helpers';

export const cnDateTimeViewSlider = cn('DateTimeViewSlider');

export const DateTimeViewSlider: DateTimeViewComponent = React.forwardRef((props, ref) => {
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

  const monthLabel = getMonthTitle(currentVisibleDate, locale);
  const nextMonthLabel = getMonthTitle(addMonths(currentVisibleDate, 1), locale);
  const daysOfWeek = getDaysOfWeek(locale);

  return (
    <div {...otherProps} ref={ref} className={cnDateTimeViewSlider({}, [className])}>
      <DateTimeYearSlider
        className={cnDateTimeViewSlider('Slider')}
        currentVisibleDate={currentVisibleDate}
        onChange={setCurrentVisibleDate}
        value={value}
        locale={locale}
      />
      <div className={cnDateTimeViewSlider('CalendarsWrapper')}>
        <div className={cnDateTimeViewSlider('Calendar')}>
          <DateTimeMonthLabel label={monthLabel} />
          <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} />
        </div>
        <div className={cnDateTimeViewSlider('Calendar')}>
          <DateTimeMonthLabel label={nextMonthLabel} />
          <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={nextDaysOfMonth} />
        </div>
      </div>
    </div>
  );
});
