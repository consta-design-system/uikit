import './CalendarDay.css';

import { classnames } from '@bem-react/classnames';
import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { useTheme } from '../../Theme/Theme';

export type CalendarDayProps = PropsWithJsxAttributes<
  {
    number: number | string;
    today?: boolean;
    selected?: boolean;
    disabled?: boolean;
    event?: boolean;
    role?: never;
    children?: never;
  },
  'div'
>;

export const cnCalendarDay = cn('CalendarDay');

export const CalendarDay = React.forwardRef<HTMLDivElement, CalendarDayProps>(
  (props, ref) => {
    const { number, today, selected, event, disabled, ...otherProps } = props;
    const { themeClassNames } = useTheme();

    const className =
      selected && !disabled
        ? classnames(props.className, themeClassNames.color.accent)
        : props.className;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnCalendarDay({ event, today, disabled, selected }, [
          className,
        ])}
        role="button"
      >
        {number}
      </div>
    );
  },
);
