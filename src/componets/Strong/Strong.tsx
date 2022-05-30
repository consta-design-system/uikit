import React from 'react';
import { Text } from '@consta/uikit/Text';

export const Strong = (props: React.HTMLAttributes<HTMLSpanElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="b" {...otherProps}>{children}</Text>
}