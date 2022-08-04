import './DateTimeCell.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';

export const DateTimeCellPropRange = ['first', 'last', true, false] as const;
export type DateTimeCellPropRange = typeof DateTimeCellPropRange[number];

export type DateTimeCellProps = PropsWithJsxAttributes<
  {
    range?: DateTimeCellPropRange;
  },
  'div'
>;

export const cnDateTimeCell = cn('DateTimeCell');

export const DateTimeCell = React.forwardRef<HTMLDivElement, DateTimeCellProps>(
  (props, ref) => {
    const { range, children, className, ...otherProps } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnDateTimeCell({ range }, [className])}
      >
        {children}
      </div>
    );
  },
);
