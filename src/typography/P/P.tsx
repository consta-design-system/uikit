import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './P.css';

const cnP = cn('P');

export const P = (props: React.HTMLAttributes<HTMLParagraphElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnP()} as="p" {...otherProps}>{children}</Text>
}