import React from 'react';
import { Text } from '@consta/uikit/Text';

export const Ol = (props: React.HTMLAttributes<HTMLOListElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="ol" {...otherProps}>{children}</Text>
}