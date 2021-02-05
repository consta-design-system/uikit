import './CalendarMount.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Text } from '../../Text/Text';
import { CalendarDay, CalendarDayProps } from '../CalendarDay/CalendarDay';
import { CalendarCell, CalendarCellProps } from '../CalendarСell/CalendarСell';

type DayOfMount = Omit<CalendarDayProps & CalendarCellProps, 'ref'>;

type CalendarMountProps = PropsWithJsxAttributes<
  {
    children?: never;
    daysOfWeek: string[];
    daysOfMount: DayOfMount[];
  },
  'div'
>;

const cnCalendarMount = cn('CalendarMount');

export const CalendarMount: React.FC<CalendarMountProps> = (props) => {
  const { className, daysOfWeek, daysOfMount, ...otherProps } = props;

  return (
    <div {...otherProps} className={cnCalendarMount(null, [className])}>
      {daysOfWeek.map((item, index) => (
        <CalendarCell key={cnCalendarMount('DayOfWeek', { index, item })}>
          <Text as="span" view="ghost" size="2xs" transform="uppercase">
            {item}
          </Text>
        </CalendarCell>
      ))}
      {daysOfMount.map(({ range, ...dayProps }, index) => (
        <CalendarCell
          key={cnCalendarMount('DayOfMount', { index, number: dayProps.number })}
          range={range}
        >
          <CalendarDay {...dayProps} />
        </CalendarCell>
      ))}
    </div>
  );
};
