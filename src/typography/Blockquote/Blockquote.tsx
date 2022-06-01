import React from 'react';
import { Text } from '@consta/uikit/Text';

export const Blockquote = (props: React.HTMLAttributes<HTMLQuoteElement>) => {
    const { children, ...otherProps } = props;
    
    return <blockquote {...otherProps}>{children}</blockquote>
}