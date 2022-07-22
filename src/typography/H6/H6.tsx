import './H6.css';

import { Text } from '@consta/uikit/Text';
import React, { useRef } from 'react';

import { useHeader } from '##/hooks/useHeader';
import { cn } from '##/utils/bem';

const cnH6 = cn('H6');

export const H6 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  return (
    <Text
      ref={ref}
      className={cnH6()}
      id={props.id ?? id}
      as="h6"
      size="m"
      weight="semibold"
      lineHeight="m"
      {...otherProps}
    >
      {label}
    </Text>
  );
};
