import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H2.css';

const cnH2 = cn('H2');

export const H2 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnH2()} as="h2" size="3xl" lineHeight="m" weight="semibold" {...otherProps}>{children}</Text>
}