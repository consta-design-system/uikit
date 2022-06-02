import React from 'react';
import { Text } from '@consta/uikit/Text';

export const Li = (props: React.HTMLAttributes<HTMLLIElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="li" {...otherProps}>{children}</Text>
}