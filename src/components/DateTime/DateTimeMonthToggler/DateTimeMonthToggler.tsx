import './DateTimeMonthToggler.css';

import React from 'react';

import { IconForward } from '../../../icons/IconForward/IconForward';
import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Button } from '../../Button/Button';
import { DateTimeMonthLabel } from '../DateTimeMonthLabel/DateTimeMonthLabel';

export type DateTimeMonthTogglerProps = PropsWithJsxAttributes<
  {
    prevOnClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    nextOnClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    label: string;
    children?: never;
  },
  'div'
>;

export const cnDateTimeMonthToggler = cn('DateTimeMonthToggler');

export const DateTimeMonthToggler: React.FC<DateTimeMonthTogglerProps> = (props) => {
  const { label, className, prevOnClick, nextOnClick, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={cnDateTimeMonthToggler(
        { withPrevButton: Boolean(prevOnClick), withNextButton: Boolean(nextOnClick) },
        [className],
      )}
    >
      {prevOnClick && (
        <Button
          className={cnDateTimeMonthToggler('Button', { direction: 'prev' })}
          onClick={prevOnClick}
          iconLeft={IconForward}
          size="s"
          view="clear"
          iconSize="s"
        />
      )}
      <DateTimeMonthLabel className={cnDateTimeMonthToggler('Label')} label={label} />
      {nextOnClick && (
        <Button
          className={cnDateTimeMonthToggler('Button', { direction: 'next' })}
          onClick={nextOnClick}
          iconLeft={IconForward}
          size="s"
          view="clear"
          iconSize="s"
        />
      )}
    </div>
  );
};
