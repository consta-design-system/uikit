import React from 'react';

export type PropsWithAsAttributes<Props, As extends keyof JSX.IntrinsicElements> = Props & {
  as?: As;
} & Omit<JSX.IntrinsicElements[As], keyof Props>;

export type ComponentWithAsAttributes<
  Props,
  Element,
  DefaultTag extends keyof JSX.IntrinsicElements = 'div'
> = <As extends keyof JSX.IntrinsicElements = DefaultTag>(
  props: PropsWithAsAttributes<Props, As> & React.RefAttributes<Element>,
) => React.ReactElement | null;
