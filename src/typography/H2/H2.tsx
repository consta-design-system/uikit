import './H2.css';

import { Text } from '@consta/uikit/Text';
import React, { useRef } from 'react';

import { useHeader } from '##/hooks/useHeader';
import { cn } from '##/utils/bem';

const cnH2 = cn('H2');

export const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  return (
    <Text
      ref={ref}
      className={cnH2()}
      id={props.id ?? id}
      as="h2"
      size="3xl"
      weight="semibold"
      lineHeight="m"
      {...otherProps}
    >
      {label}
    </Text>
  );
};
