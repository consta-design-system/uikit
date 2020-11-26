import './Calendar.css';

import React from 'react';
import { addMonths, isWithinInterval } from 'date-fns';

import { range } from '../../utils/array';
import { cn } from '../../utils/bem';
import { getMonthTitle, isDateRange, isOnlyOneDateInRange } from '../../utils/date';
import { isDefined, isNotNil } from '../../utils/type-guards';
import { DateRange, MinMaxDate } from '../../utils/types/Date';
import { Text } from '../Text/Text';

import { CalendarDay } from './CalendarDay/CalendarDay';
import { CalendarWeekHeader } from './CalendarWeekHeader/CalendarWeekHeader';
import { getMonthWeeks } from './helpers';

type onChangeValueProps<T> = {
  onChange: (value: T) => void;
  value?: T;
};

type SingleProps = {
  type: 'date';
} & onChangeValueProps<Date>;

type RangeProps = {
  type: 'date-range';
} & onChangeValueProps<DateRange>;

type Props = MinMaxDate & { currentVisibleDate: Date } & (SingleProps | RangeProps);

export const cnCalendar = cn('Calendar');

export const Calendar: React.FC<Props> = (props) => {
  const { value, currentVisibleDate, minDate, maxDate } = props;
  const [hoveredDate, setHoveredDate] = React.useState<Date>();

  const handleHoverDate = (date: Date): void => {
    if (isWithinInterval(date, { start: minDate, end: maxDate })) {
      return setHoveredDate(date);
    }

    return setHoveredDate(undefined);
  };
  let handleSelectDate: (date: Date) => void;
  if (props.type === 'date-range') {
    handleSelectDate = (date: Date): void => {
      if (!isWithinInterval(date, { start: minDate, end: maxDate }) || !isNotNil(props.value)) {
        return;
      }

      if (!isOnlyOneDateInRange(props.value)) {
        return props.onChange([date, undefined]);
      }

      const [startDate, endDate] = props.value;

      if (isDefined(startDate)) {
        return props.onChange(startDate > date ? [date, startDate] : [startDate, date]);
      }

      if (isDefined(endDate)) {
        return props.onChange(endDate > date ? [date, endDate] : [endDate, date]);
      }
    };
  } else {
    handleSelectDate = (date: Date): void => {
      if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
        return;
      }

      return props.onChange(date);
    };
  }

  const monthsAmount = isDateRange(value) ? 2 : 1;

  return (
    <div className={cnCalendar()}>
      {range(monthsAmount).map((idx) => {
        const month = addMonths(currentVisibleDate, idx);
        const weeks = getMonthWeeks(month);

        return (
          <div key={idx} className={cnCalendar('Month')}>
            {isDateRange(value) && (
              <Text
                size="s"
                weight="bold"
                transform="uppercase"
                view="primary"
                spacing="xs"
                className={cnCalendar('Title')}
              >
                {getMonthTitle(month)}
              </Text>
            )}
            <div className={cnCalendar('Row', { withDaynames: true })}>
              <CalendarWeekHeader />
            </div>
            <div className={cnCalendar('Weeks')}>
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className={cnCalendar('Row')}>
                  {week.map((date, idx) => (
                    <CalendarDay
                      date={date}
                      minDate={minDate}
                      maxDate={maxDate}
                      dayIdx={idx}
                      value={value}
                      hoveredDate={hoveredDate}
                      onMouseEnter={() => date && handleHoverDate(date)}
                      onMouseLeave={() => date && setHoveredDate(undefined)}
                      onClick={() => date && handleSelectDate(date)}
                      onKeyDown={() => date && handleSelectDate(date)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
