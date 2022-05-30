import React from 'react';
import { Text } from '@consta/uikit/Text';

export const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="h3" {...otherProps}>{children}</Text>
}