import React from 'react';

import { AsTagAttribute, AsTags } from './AsTags';

export type PropsWithAsAttributes<Props, As extends AsTags> = Props & {
  as?: As;
} & Omit<AsTagAttribute<As>, keyof Props>;

export type ComponentWithAs<Props, DefaultTag extends AsTags = 'div'> = <
  As extends AsTags = DefaultTag,
>(
  props: PropsWithAsAttributes<Props, As> & React.RefAttributes<Element>,
) => React.ReactElement | null;

type ForwardRefWithAs<Props> = <As extends AsTags>(
  props: PropsWithAsAttributes<Props, As>,
  ref: React.Ref<HTMLElement>,
) => React.ReactElement | null;

export function forwardRefWithAs<Props, As extends AsTags = 'div'>(
  render: ForwardRefWithAs<Props>,
) {
  return React.forwardRef<HTMLElement, PropsWithAsAttributes<Props, As>>(
    render,
  ) as unknown as ComponentWithAs<Props, As>;
}
