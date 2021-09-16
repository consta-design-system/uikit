import './DateTimeTypeDateViewSlider.css';

import React from 'react';
import { addMonths, startOfMonth } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cn } from '../../../utils/bem';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';
import { DateTimeMonth } from '../DateTimeMonth/DateTimeMonth';
import { DateTimeTypeMonthViewSlider } from '../DateTimeTypeMonthViewSlider/DateTimeTypeMonthViewSlider';
import { DateTimeYearSlider } from '../DateTimeYearSlider/DateTimeYearSlider';
import {
  DateTimeViewComponent,
  getDaysOfMonth,
  getDaysOfWeek,
  getHandleSelectDate,
  getMonthTitle,
  isEqualDay,
  useCurrentVisibleDate,
} from '../helpers';

export const cnDateTimeTypeDateViewSlider = cn('DateTimeTypeDateViewSlider');

export const DateTimeTypeDateViewSlider: DateTimeViewComponent = React.forwardRef((props, ref) => {
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

  const [changeMonth, { on, off }] = useFlag();

  const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
    currentVisibleDate: currentVisibleDateProp,
    maxDate,
    minDate,
    value,
    startOfUnit: startOfMonth,
  });

  const handleSelectDate = getHandleSelectDate({
    minDate,
    maxDate,
    value,
    onChange,
    onChangeRange,
    isEqualUnit: isEqualDay,
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

  const pageOneLabel = getMonthTitle(currentVisibleDate, locale);
  const pageTwoLabel = getMonthTitle(addMonths(currentVisibleDate, 1), locale);
  const daysOfWeek = getDaysOfWeek(locale);

  if (changeMonth) {
    return (
      <DateTimeTypeMonthViewSlider
        {...otherProps}
        ref={ref}
        className={className}
        minDate={minDate}
        maxDate={maxDate}
        locale={locale}
        events={events}
        currentVisibleDate={currentVisibleDate}
        onChange={({ value }) => {
          setCurrentVisibleDate(value);
          off();
        }}
      />
    );
  }

  return (
    <div {...otherProps} ref={ref} className={cnDateTimeTypeDateViewSlider({}, [className])}>
      <DateTimeYearSlider
        className={cnDateTimeTypeDateViewSlider('Slider')}
        currentVisibleDate={currentVisibleDate}
        onChange={setCurrentVisibleDate}
        value={value}
        locale={locale}
      />
      <div className={cnDateTimeTypeDateViewSlider('PageWrapper')}>
        <div className={cnDateTimeTypeDateViewSlider('Page')}>
          <DateTimeLabel
            className={cnDateTimeTypeDateViewSlider('Label')}
            label={pageOneLabel}
            onClick={on}
            cursor="pointer"
          />
          <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} />
        </div>
        <div className={cnDateTimeTypeDateViewSlider('Page')}>
          <DateTimeLabel
            className={cnDateTimeTypeDateViewSlider('Label')}
            label={pageTwoLabel}
            onClick={on}
            cursor="pointer"
          />
          <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={nextDaysOfMonth} />
        </div>
      </div>
    </div>
  );
});
