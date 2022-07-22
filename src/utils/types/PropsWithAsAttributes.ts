import React from 'react';

export type PropsWithAsAttributes<
  Props,
  As extends keyof JSX.IntrinsicElements,
> = Props & {
  as?: As;
} & Omit<JSX.IntrinsicElements[As], keyof Props>;

export type ComponentWithAs<
  Props,
  DefaultTag extends keyof JSX.IntrinsicElements = 'div',
> = <As extends keyof JSX.IntrinsicElements = DefaultTag>(
  props: PropsWithAsAttributes<Props, As> & React.RefAttributes<Element>,
) => React.ReactElement | null;

type ForwardRefWithAs<Props> = <As extends keyof JSX.IntrinsicElements>(
  props: PropsWithAsAttributes<Props, As>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

export function forwardRefWithAs<
  Props,
  As extends keyof JSX.IntrinsicElements = 'div',
>(render: ForwardRefWithAs<Props>) {
  return React.forwardRef<HTMLElement, PropsWithAsAttributes<Props, As>>(
    render,
  ) as unknown as ComponentWithAs<Props, As>;
}
