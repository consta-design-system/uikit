import './DateTimeMonthLabel.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Text } from '../../Text/Text';

export type DateTimeMonthLabelProps = PropsWithHTMLAttributes<
  {
    label: string;
    children?: never;
  },
  HTMLDivElement
>;

export const cnDateTimeMonthLabel = cn('DateTimeMonthLabel');

export const DateTimeMonthLabel: React.FC<DateTimeMonthLabelProps> = (props) => {
  const { label, className, ...otherProps } = props;

  return (
    <Text
      {...otherProps}
      className={cnDateTimeMonthLabel(null, [className])}
      as="span"
      size="s"
      align="center"
      weight="bold"
    >
      {label}
    </Text>
  );
};
