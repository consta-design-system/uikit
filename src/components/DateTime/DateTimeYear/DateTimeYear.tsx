import './DateTimeYear.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { DateTimeCellPropRange } from '../DateTimeCell/DateTimeCell';
import { DateTimeGrid } from '../DateTimeGrid/DateTimeGrid';
import { DateTimeItemProps } from '../DateTimeItem/DateTimeItem';

export type DateTimeYearProps = PropsWithJsxAttributes<
  {
    children?: never;
    years: Omit<
      DateTimeItemProps & {
        range?: DateTimeCellPropRange;
      },
      'ref'
    >[];
  },
  'div'
>;

export const cnDateTimeYear = cn('DateTimeYear');

export const DateTimeYear: React.FC<DateTimeYearProps> = (props) => {
  const { className, years, ...otherProps } = props;

  return (
    <DateTimeGrid
      {...otherProps}
      className={cnDateTimeYear(null, [className])}
      items={years}
    />
  );
};
