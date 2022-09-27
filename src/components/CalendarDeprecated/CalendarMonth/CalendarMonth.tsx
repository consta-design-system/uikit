import './CalendarMonth.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Text } from '../../Text/Text';
import { CalendarCell, CalendarCellProps } from '../CalendarCell/CalendarCell';
import { CalendarDay, CalendarDayProps } from '../CalendarDay/CalendarDay';

type DayOfMonth = Omit<CalendarDayProps & CalendarCellProps, 'ref'>;

export type CalendarMonthProps = PropsWithJsxAttributes<
  {
    children?: never;
    daysOfWeek: string[];
    daysOfMonth: DayOfMonth[];
  },
  'div'
>;

export const cnCalendarMonth = cn('CalendarMonth');

export const CalendarMonth: React.FC<CalendarMonthProps> = (props) => {
  const { className, daysOfWeek, daysOfMonth, ...otherProps } = props;

  return (
    <div {...otherProps} className={cnCalendarMonth(null, [className])}>
      {daysOfWeek.map((item, index) => (
        <CalendarCell key={cnCalendarMonth('DayOfWeek', { index, item })}>
          <Text as="span" view="ghost" size="2xs" transform="uppercase">
            {item}
          </Text>
        </CalendarCell>
      ))}
      {daysOfMonth.map(({ range, ...dayProps }, index) => (
        <CalendarCell
          key={cnCalendarMonth('DayOfMonth', {
            index,
            number: dayProps.number,
          })}
          range={range}
        >
          <CalendarDay {...dayProps} />
        </CalendarCell>
      ))}
    </div>
  );
};
