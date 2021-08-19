import './CalendarGrid.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Text } from '../../Text/Text';
import { CalendarCell, CalendarCellProps } from '../CalendarCell/CalendarCell';
import { CalendarItem, CalendarItemProps } from '../CalendarItem/CalendarItem';

type Item = string | Omit<CalendarItemProps & CalendarCellProps, 'ref'>;

export type CalendarGridProps = PropsWithJsxAttributes<
  {
    children?: never;
    items: Item[];
  },
  'div'
>;

export const cnCalendarGrid = cn('CalendarGrid');

const renderItem = (item: Item, index: number) => {
  if (typeof item === 'string') {
    return (
      <CalendarCell key={cnCalendarGrid('String', { index, item })}>
        <Text as="span" view="ghost" size="2xs" transform="uppercase">
          {item}
        </Text>
      </CalendarCell>
    );
  }

  const { range, ...dayProps } = item;

  return (
    <CalendarCell key={cnCalendarGrid('Item', { index, number: dayProps.label })} range={range}>
      <CalendarItem {...dayProps} />
    </CalendarCell>
  );
};

export const CalendarGrid: React.FC<CalendarGridProps> = (props) => {
  const { className, items, ...otherProps } = props;

  return (
    <div {...otherProps} className={cnCalendarGrid(null, [className])}>
      {items.map(renderItem)}
    </div>
  );
};
