import './DateTimeToggler.css';

import { IconForward } from '@consta/icons/IconForward';
import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { Button } from '../../Button/Button';
import { DateTimeLabel } from '../DateTimeLabel/DateTimeLabel';

export type DateTimeTogglerProps = PropsWithJsxAttributes<
  {
    prevOnClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    nextOnClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    onLabelClick?: React.EventHandler<React.MouseEvent<HTMLDivElement>>;
    label: string | number;
    children?: never;
  },
  'div'
>;

export const cnDateTimeToggler = cn('DateTimeToggler');

export const DateTimeToggler: React.FC<DateTimeTogglerProps> = (props) => {
  const {
    label,
    className,
    prevOnClick,
    nextOnClick,
    onLabelClick,
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      className={cnDateTimeToggler(
        {
          withPrevButton: Boolean(prevOnClick),
          withNextButton: Boolean(nextOnClick),
        },
        [className],
      )}
    >
      {prevOnClick && (
        <Button
          type="button"
          className={cnDateTimeToggler('Button', { direction: 'prev' })}
          onClick={prevOnClick}
          iconLeft={IconForward}
          size="s"
          view="clear"
          iconSize="s"
        />
      )}
      <DateTimeLabel
        onClick={onLabelClick}
        cursor={onLabelClick && 'pointer'}
        className={cnDateTimeToggler('Label')}
        label={label}
        align="center"
      />
      {nextOnClick && (
        <Button
          type="button"
          className={cnDateTimeToggler('Button', { direction: 'next' })}
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
