import React from "react";
import { Text } from '@consta/uikit/Text';

export const Code = (props: React.HTMLAttributes<HTMLSpanElement>) => {
    const { children, ...otherProps } = props;

    return (
        <Text as="code" {...otherProps}>{children}</Text>
    )
}