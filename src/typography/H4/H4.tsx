import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H4.css';

const cnH4 = cn('H4');

export const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnH4()} as="h4" size="xl" lineHeight="m" weight="semibold" {...otherProps}>{children}</Text>
}