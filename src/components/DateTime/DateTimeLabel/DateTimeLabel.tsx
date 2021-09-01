import './DateTimeLabel.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Text } from '../../Text/Text';

export type DateTimeLabelProps = PropsWithHTMLAttributes<
  {
    label: string | number;
    children?: never;
  },
  HTMLDivElement
>;

export const cnDateTimeLabel = cn('DateTimeLabel');

export const DateTimeLabel: React.FC<DateTimeLabelProps> = (props) => {
  const { label, className, ...otherProps } = props;

  return (
    <Text
      {...otherProps}
      className={cnDateTimeLabel(null, [className])}
      as="span"
      size="s"
      align="center"
      weight="bold"
    >
      {label}
    </Text>
  );
};
