import React from 'react';
import { isSameDay, isSunday, isToday, isWithinInterval } from 'date-fns';

import { isDateRange, isOnlyOneDateInRange } from '../../../utils/date';
import { DateRange } from '../../DatePicker/DatePickerRangeControl/DatePickerRangeControl';
import { MinMaxDate } from '../../DatePicker/types';
import { Text } from '../../Text/Text';
import { cnCalendar } from '../Calendar';
import {
  dateComparer,
  isDateHighlighted,
  isValueSelected,
  isValueSelectedBackwards,
} from '../helpers';

type Props = {
  value: Date | DateRange | undefined;
  date: Date | undefined;
  hoveredDate: Date | undefined;
  dayIdx: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onKeyDown: () => void;
} & MinMaxDate;

export const CalendarDay: React.FC<Props> = ({
  value,
  date,
  minDate,
  maxDate,
  hoveredDate,
  dayIdx,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
}) => {
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className={cnCalendar('CellContent')}>
        <Text as="span" size="s" className={cnCalendar('CellContentText')}>
          {date.getDate()}
        </Text>
      </div>
    </div>
  );
};
