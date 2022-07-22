import { Text } from '@consta/uikit/Text';
import React from 'react';

import { useMdxLink } from '##/hooks/useMdxLink';

export const A = (
  props: React.HTMLAttributes<HTMLAnchorElement> & { href: string },
) => {
  const { children, href = '', ...otherProps } = props;

  const link = useMdxLink(href);

  return (
    <Text
      as="a"
      href={link[0]}
      view="link"
      style={{ textDecoration: 'none' }}
      onClick={link[1]}
      {...otherProps}
    >
      {children}
    </Text>
  );
};
