import React from 'react';
import { Text } from '@consta/uikit/Text';

export const Strong = (props: React.HTMLAttributes<HTMLSpanElement>) => {
    const { children, ...otherProps } = props;

    return <b {...otherProps}>{children}</b>
}