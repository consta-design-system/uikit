import { Text } from '@consta/uikit/Text';
import React from 'react';

export const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
  const { children, ...otherProps } = props;

  return (
    <Text as="pre" {...otherProps}>
      {children}
    </Text>
  );
};
