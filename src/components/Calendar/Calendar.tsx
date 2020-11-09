import './Calendar.css';

import React from 'react';
import {
  addDays,
  addMonths,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  isBefore,
  isSameDay,
  isSunday,
  isToday,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { chunk, range } from '../../utils/array';
import { cn } from '../../utils/bem';
import { getMonthTitle, isDateRange, isOnlyOneDateInRange } from '../../utils/date';
import { isDefined, isNotNil } from '../../utils/type-guards';
import { DateRange, MinMaxDate } from '../../utils/types/Date';
import { Text } from '../Text/Text';

type OnSelectValueProps<T> = {
  onSelect: (value: T) => void;
  value?: T;
};

type SingleProps = {
  type: 'date';
} & OnSelectValueProps<Date>;

type RangeProps = {
  type: 'date-range';
} & OnSelectValueProps<DateRange>;

type Props = MinMaxDate & { currentVisibleDate: Date } & (SingleProps | RangeProps);

const cnCalendar = cn('Calendar');

const dateComparer = (a?: Date, b?: Date): number => (a?.getTime() ?? 0) - (b?.getTime() ?? 0);

const getStartAndEndDate = (date1: Date, date2: Date): { start: Date; end: Date } => {
  const [start, end] = [date1, date2].sort(dateComparer);

  return { start, end };
};

export const isDateHighlighted = ({
  date,
  value,
  hoveredDate,
}: {
  date: Date;
  hoveredDate?: Date;
  value?: Date | DateRange;
}): boolean => {
  if (!hoveredDate || !isDateRange(value) || !isOnlyOneDateInRange(value)) {
    return false;
  }

  const [startDate, endDate] = value;

  if (isDefined(startDate)) {
    return isWithinInterval(date, getStartAndEndDate(startDate, hoveredDate));
  }

  if (isDefined(endDate)) {
    return isWithinInterval(date, getStartAndEndDate(endDate, hoveredDate));
  }

  return false;
};

const isDateSelected = ({ date, value }: { date: Date; value?: Date }): boolean => {
  return value ? isSameDay(value, date) : false;
};

export const isValueSelected = ({
  date,
  value,
}: {
  date: Date;
  value?: Date | DateRange;
}): boolean => {
  if (isDateRange(value)) {
    if (value[0] && value[1]) {
      const { start, end } = getStartAndEndDate(value[0], value[1]);
      return isWithinInterval(date, { start, end });
    }

    return isDateSelected({ date, value: value[0] || value[1] });
  }
  return isDateSelected({ date, value });
};

export const isValueSelectedBackwards = ({
  value,
  hoveredDate,
}: {
  value?: Date | DateRange;
  hoveredDate?: Date;
}): boolean | undefined => {
  return (
    hoveredDate &&
    isDateRange(value) &&
    isOnlyOneDateInRange(value) &&
    ((isDefined(value[0]) && isBefore(hoveredDate, value[0])) ||
      (isDefined(value[1]) && isBefore(hoveredDate, value[1])))
  );
};

const getMonthWeeks = (date: Date): (Date | undefined)[][] => {
  const currentMonth = date.getMonth();
  const startDate = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });
  const diffDays = differenceInDays(endDate, startDate) + 1;

  const days = range(diffDays).map((index) => {
    const day = addDays(startDate, index);

    if (day.getMonth() === currentMonth) {
      return day;
    }

    return undefined;
  });

  return chunk(days, 7);
};

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
        return props.onSelect([date, undefined]);
      }

      const [startDate, endDate] = props.value;

      if (isDefined(startDate)) {
        return props.onSelect(startDate > date ? [date, startDate] : [startDate, date]);
      }

      if (isDefined(endDate)) {
        return props.onSelect(endDate > date ? [date, endDate] : [endDate, date]);
      }
    };
  } else {
    handleSelectDate = (date: Date): void => {
      if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
        return;
      }

      return props.onSelect(date);
    };
  }

  const monthsAmount = isDateRange(value) ? 2 : 1;

  const renderDay = (date: Date | undefined, dayIdx: number): React.ReactElement | undefined => {
    if (!date) {
      return (
        <div key={dayIdx} className={cnCalendar('Cell')}>
          <div className={cnCalendar('CellContent')} />
        </div>
      );
    }

    const isDateToday = isToday(date);
    const isDisabled = !isWithinInterval(date, { start: minDate, end: maxDate });
    const isHighlighted = isDateHighlighted({ date, value, hoveredDate });
    const isSelected = isValueSelected({ date, value });
    const isSelectedBackwards = isValueSelectedBackwards({ value, hoveredDate });
    const [firstDate, lastDate] = isDateRange(value)
      ? value.sort(dateComparer)
      : [undefined, undefined];
    const isFirstDate = isDateRange(value) && firstDate ? isSameDay(firstDate, date) : false;
    const isLastDate = isDateRange(value) && lastDate ? isSameDay(lastDate, date) : false;

    return (
      <div
        key={dayIdx}
        role="button"
        tabIndex={0}
        className={cnCalendar('Cell', {
          today: isDateToday,
          disabled: isDisabled,
          selectable: !isDisabled,
          selected: isSelected,
          first: isFirstDate,
          last: isLastDate,
          selectedBackwards: isSelectedBackwards,
          highlighted: isDateRange(value) && isHighlighted,
          single: !isDateRange(value),
          range: isDateRange(value),
          oneValue: isDateRange(value) && isOnlyOneDateInRange(value),
          lastWeekDay: isDateRange(value) && isSunday(date),
        })}
        onMouseEnter={() => handleHoverDate(date)}
        onMouseLeave={() => setHoveredDate(undefined)}
        onClick={() => handleSelectDate(date)}
        onKeyDown={() => handleSelectDate(date)}
      >
        <div className={cnCalendar('CellContent')}>
          <Text as="span" size="s" className={cnCalendar('CellContentText')}>
            {date.getDate()}
          </Text>
        </div>
      </div>
    );
  };

  const weekHeader = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((dayName, idx) => (
    <div key={idx} className={cnCalendar('Cell', { weekDay: true })}>
      <div className={cnCalendar('CellContent')}>
        <Text as="span" size="2xs" transform="uppercase" view="ghost" spacing="xs">
          {dayName}
        </Text>
      </div>
    </div>
  ));

  return (
    <div className={cnCalendar()}>
      {range(monthsAmount).map((idx) => {
        const month = addMonths(currentVisibleDate, idx);
        const weeks = getMonthWeeks(month);

        return (
          <div key={idx} className={cnCalendar('Month')}>
            {isDateRange(value) && (
              <Text
                as="div"
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
            <div className={cnCalendar('Row', { withDaynames: true })}>{weekHeader}</div>
            <div className={cnCalendar('Weeks')}>
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className={cnCalendar('Row')}>
                  {week.map(renderDay)}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
