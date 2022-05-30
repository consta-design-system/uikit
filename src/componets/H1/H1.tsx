import React from 'react';
import { Text } from '@consta/uikit/Text';

export const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="h1" {...otherProps}>{children}</Text>
}