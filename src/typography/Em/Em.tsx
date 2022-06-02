import React from "react";
import { Text } from '@consta/uikit/Text';

export const Em = (props: React.HTMLAttributes<HTMLEmbedElement>) => {
    const { children, ...otherProps } = props;

    return <em {...otherProps}>{children}</em>
}