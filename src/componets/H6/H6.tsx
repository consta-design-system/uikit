import React from 'react';
import { Text } from '@consta/uikit/Text';

export const H6 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="h6" {...otherProps}>{children}</Text>
}