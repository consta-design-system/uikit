import './DateTimeTypeDateViewClassic.css';

import React from 'react';
import { addMonths, startOfMonth } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { cn } from '../../../utils/bem';
import { DateTimeMonth } from '../DateTimeMonth/DateTimeMonth';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import { DateTimeTypeMountViewClassic } from '../DateTimeTypeMountViewClassic/DateTimeTypeMountViewClassic';
import {
  DateTimeViewComponent,
  getDaysOfMonth,
  getDaysOfWeek,
  getHandleSelectDate,
  getMouthLabelWithYear,
  isEqualDay,
  useCurrentVisibleDate,
} from '../helpers';

export const cnDateTimeTypeDateViewClassic = cn('DateTimeTypeDateViewClassic');

export const DateTimeTypeDateViewClassic: DateTimeViewComponent = React.forwardRef((props, ref) => {
  const {
    className,
    minDate,
    maxDate,
    value,
    onChange,
    onChangeRange,
    currentVisibleDate: currentVisibleDateProp,
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

  const monthLabel = getMouthLabelWithYear(currentVisibleDate, locale);
  const daysOfWeek = getDaysOfWeek(locale);
  const nextMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  if (changeMonth) {
    return (
      <DateTimeTypeMountViewClassic
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
    <div {...otherProps} ref={ref} className={cnDateTimeTypeDateViewClassic(null, [className])}>
      <DateTimeToggler
        className={cnDateTimeTypeDateViewClassic('Label')}
        prevOnClick={prevMonthHandle}
        nextOnClick={nextMonthHandle}
        label={monthLabel}
        onLabelClick={on}
      />
      <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} />
    </div>
  );
});
