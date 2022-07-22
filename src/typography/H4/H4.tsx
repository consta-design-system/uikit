import React, { useRef } from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H4.css';
import { useHeader } from '##/hooks/useHeader';

const cnH4 = cn('H4');

export const H4 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    const ref = useRef<HTMLHeadingElement>(null);
    const { id, label } = useHeader(children, ref);

    return (
        <Text
            ref={ref}
            className={cnH4()}
            id={props.id ?? id}
            as="h4"
            size="xl"
            weight="semibold"
            lineHeight="m" 
            {...otherProps}
        >
            {label}
        </Text>
    )
}