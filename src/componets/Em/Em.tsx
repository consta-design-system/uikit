import React from "react";
import { Text } from '@consta/uikit/Text';

export const Em = (props: React.HTMLAttributes<HTMLEmbedElement>) => {
    const { children, ...otherProps } = props;

    return <Text as="em" {...otherProps}>{children}</Text>
}