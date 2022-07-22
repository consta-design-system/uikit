import React, { useRef } from 'react';
import { Text } from '@consta/uikit/Text';
import { cn } from '##/utils/bem';
import './H1.css';
import { useHeader } from '##/hooks/useHeader';

const cnH1 = cn('H1');

export const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    const { children, ...otherProps } = props;

    const ref = useRef<HTMLHeadingElement>(null);
    const { id, label } = useHeader(children, ref);

    return (
        <Text
            ref={ref}
            className={cnH1()}
            id={props.id ?? id}
            as="h1"
            size="4xl"
            weight="semibold"
            lineHeight="m" 
            {...otherProps}
        >
            {label}
        </Text>
    )
}