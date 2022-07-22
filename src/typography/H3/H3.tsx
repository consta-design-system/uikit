import './H3.css';

import { Text } from '@consta/uikit/Text';
import React, { useRef } from 'react';

import { useHeader } from '##/hooks/useHeader';
import { cn } from '##/utils/bem';

const cnH3 = cn('H3');

export const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { children, ...otherProps } = props;

  const ref = useRef<HTMLHeadingElement>(null);
  const { id, label } = useHeader(children, ref);

  return (
    <Text
      ref={ref}
      className={cnH3()}
      id={props.id ?? id}
      as="h3"
      size="2xl"
      weight="semibold"
      lineHeight="m"
      {...otherProps}
    >
      {label}
    </Text>
  );
};
