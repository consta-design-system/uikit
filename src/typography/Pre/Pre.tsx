import React from 'react';
import { Text } from '@consta/uikit/Text';

export const Pre = (props: React.HTMLAttributes<HTMLPreElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="pre" {...otherProps}>{children}</Text>
}