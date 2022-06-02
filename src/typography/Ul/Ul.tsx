import React from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './Ul.css';

const cnUl = cn('Ul');

export const Ul = (props: React.HTMLAttributes<HTMLUListElement>) => {
    const { children, ...otherProps } = props;

    return <Text className={cnUl()} as="ul" {...otherProps}>{children}</Text>
}