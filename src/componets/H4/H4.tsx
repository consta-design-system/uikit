import React from 'react';
import { Text } from '@consta/uikit/Text';

export const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="h4" {...otherProps}>{children}</Text>
}