import React from 'react';
import { addMonths, startOfMonth } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { useFlag } from '../../../hooks/useFlag/useFlag';
import { DateTimeMonth } from '../DateTimeMonth/DateTimeMonth';
import { DateTimeToggler } from '../DateTimeToggler/DateTimeToggler';
import { DateTimeTypeMonthViewBook } from '../DateTimeTypeMonthViewBook/DateTimeTypeMonthViewBook';
import {
  DateTimeViewComponent,
  getDaysOfMonth,
  getDaysOfWeek,
  getHandleSelectDate,
  getMouthLabelWithYear,
  isEqualDay,
  useCurrentVisibleDate,
} from '../helpers';
import { cnDateTimeMixViewBook } from '../mixs';

export const DateTimeTypeDateViewBook: DateTimeViewComponent = React.forwardRef((props, ref) => {
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

  const monthLabel = getMouthLabelWithYear(currentVisibleDate, locale);
  const nextMonthLabel = getMouthLabelWithYear(addMonths(currentVisibleDate, 1), locale);
  const daysOfWeek = getDaysOfWeek(locale);

  const nextMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  if (changeMonth) {
    return (
      <DateTimeTypeMonthViewBook
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
    <div {...otherProps} ref={ref} className={cnDateTimeMixViewBook(null, [className])}>
      <div className={cnDateTimeMixViewBook('Page')}>
        <DateTimeToggler
          className={cnDateTimeMixViewBook('Label')}
          prevOnClick={prevMonthHandle}
          label={monthLabel}
          onLabelClick={on}
        />
        <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} />
      </div>
      <div className={cnDateTimeMixViewBook('Page')}>
        <DateTimeToggler
          className={cnDateTimeMixViewBook('Label')}
          nextOnClick={nextMonthHandle}
          label={nextMonthLabel}
          onLabelClick={on}
        />
        <DateTimeMonth daysOfWeek={daysOfWeek} daysOfMonth={nextDaysOfMonth} />
      </div>
    </div>
  );
});
