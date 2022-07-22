import './P.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

const cnP = cn('P');

export const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { children, ...otherProps } = props;

  return (
    <Text className={cnP()} as="p" {...otherProps}>
      {children}
    </Text>
  );
};
