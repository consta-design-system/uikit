import './DateTime10Years.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { DateTimeCellPropRange } from '../DateTimeCell/DateTimeCell';
import { DateTimeGrid } from '../DateTimeGrid/DateTimeGrid';
import { DateTimeItemProps } from '../DateTimeItem/DateTimeItem';

export type DateTime10YearsProps = PropsWithJsxAttributes<
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

export const cnDateTime10Years = cn('DateTime10Years');

export const DateTime10Years: React.FC<DateTime10YearsProps> = (props) => {
  const { className, years, ...otherProps } = props;

  return (
    <DateTimeGrid
      {...otherProps}
      className={cnDateTime10Years(null, [className])}
      items={years}
    />
  );
};
