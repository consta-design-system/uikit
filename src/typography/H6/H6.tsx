import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H6.css';

const cnH6 = cn('H6');

export const H6 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnH6()} as="h6" size="m" lineHeight="m" weight="semibold" {...otherProps}>{children}</Text>
}