import React, { useRef } from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H6.css';
import { useHeader } from '##/hooks/useHeader';

const cnH6 = cn('H6');

export const H6 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    const ref = useRef<HTMLHeadingElement>(null);
    const { id, label } = useHeader(children, ref);

    return (
        <Text
            ref={ref}
            className={cnH6()}
            id={props.id ?? id}
            as="h6"
            size="m"
            weight="semibold"
            lineHeight="m" 
            {...otherProps}
        >
            {label}
        </Text>
    )
}