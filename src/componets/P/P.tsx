import React from 'react';
import { Text } from '@consta/uikit/Text';

export const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="p" {...otherProps}>{children}</Text>
}