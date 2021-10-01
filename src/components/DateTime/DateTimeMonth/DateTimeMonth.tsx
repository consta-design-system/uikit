import './DateTimeMonth.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { DateTimeCellPropRange } from '../DateTimeCell/DateTimeCell';
import { DateTimeGrid } from '../DateTimeGrid/DateTimeGrid';
import { DateTimeItemProps } from '../DateTimeItem/DateTimeItem';

export type DateTimeMonthProps = PropsWithJsxAttributes<
  {
    children?: never;
    daysOfWeek: string[];
    daysOfMonth: Omit<
      DateTimeItemProps & {
        range?: DateTimeCellPropRange;
      },
      'ref'
    >[];
  },
  'div'
>;

export const cnDateTimeMonth = cn('DateTimeMonth');

export const DateTimeMonth: React.FC<DateTimeMonthProps> = (props) => {
  const { className, daysOfWeek, daysOfMonth, ...otherProps } = props;

  return (
    <DateTimeGrid
      {...otherProps}
      className={cnDateTimeMonth(null, [className])}
      items={[...daysOfWeek, ...daysOfMonth]}
    />
  );
};
