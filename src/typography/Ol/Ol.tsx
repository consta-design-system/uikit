import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './Ol.css';

const cnOl = cn('Ol');

export const Ol = (props: React.HTMLAttributes<HTMLOListElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnOl()} as="ol" {...otherProps}>{children}</Text>
}