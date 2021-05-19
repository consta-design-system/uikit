import './CalendarMountLabel.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Text } from '../../Text/Text';

export type CalendarMountLabelProps = PropsWithHTMLAttributes<
  {
    label: string;
    children?: never;
  },
  HTMLDivElement
>;

export const cnCalendarMountLabel = cn('CalendarMountLabel');

export const CalendarMountLabel: React.FC<CalendarMountLabelProps> = (props) => {
  const { label, className, ...otherProps } = props;

  return (
    <Text
      {...otherProps}
      className={cnCalendarMountLabel(null, [className])}
      as="span"
      size="s"
      align="center"
      weight="bold"
    >
      {label}
    </Text>
  );
};
