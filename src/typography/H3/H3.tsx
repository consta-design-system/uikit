import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H3.css';

const cnH3 = cn('H3');

export const H3 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnH3()} as="h3" size="2xl" lineHeight="m" weight="semibold" {...otherProps}>{children}</Text>
}