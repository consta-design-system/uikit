import './Ol.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

const cnOl = cn('Ol');

export const Ol = (props: React.HTMLAttributes<HTMLOListElement>) => {
  const { children, ...otherProps } = props;

  return (
    <Text className={cnOl()} as="ol" {...otherProps}>
      {children}
    </Text>
  );
};
