import { Text } from '@consta/uikit/Text';
import React from 'react';

export const Li = (props: React.HTMLAttributes<HTMLLIElement>) => {
  const { children, ...otherProps } = props;

  return (
    <Text as="li" {...otherProps}>
      {children}
    </Text>
  );
};
