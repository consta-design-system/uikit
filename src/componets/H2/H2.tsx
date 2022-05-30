import React from 'react';
import { Text } from '@consta/uikit/Text';

export const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="h2" {...otherProps}>{children}</Text>
}