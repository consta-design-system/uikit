import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H1.css';

const cnH1 = cn('H1');

export const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnH1()} as="h1" size="4xl" weight="semibold" lineHeight="m" {...otherProps}>{children}</Text>
}