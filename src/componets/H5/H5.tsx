import React from 'react';
import { Text } from '@consta/uikit/Text';

export const H5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="h5" {...otherProps}>{children}</Text>
}