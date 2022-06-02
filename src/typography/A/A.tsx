import React from 'react';
import { Text } from '@consta/uikit/Text';

export const A = (props: React.HTMLAttributes<HTMLAnchorElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="a" {...otherProps} view="link" style={{ textDecoration: 'none'}}>{children}</Text>
}