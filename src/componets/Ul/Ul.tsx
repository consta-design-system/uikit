import React from 'react';
import { Text } from '@consta/uikit/Text';

export const Ul = (props: React.HTMLAttributes<HTMLUListElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="ul" {...otherProps}>{children}</Text>
}