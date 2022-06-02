import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H5.css';

const cnH5 = cn('H5');

export const H5 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnH5()} as="h5" size="l" lineHeight="m" weight="semibold" {...otherProps}>{children}</Text>
}