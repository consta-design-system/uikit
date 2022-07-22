import './Ul.css';

import { Text } from '@consta/uikit/Text';
import React from 'react';

import { cn } from '##/utils/bem';

const cnUl = cn('Ul');

export const Ul = (props: React.HTMLAttributes<HTMLUListElement>) => {
  const { children, ...otherProps } = props;

  return (
    <Text className={cnUl()} as="ul" {...otherProps}>
      {children}
    </Text>
  );
};
