import React, { useRef } from 'react';

import { useForkRef } from '../../hooks/useForkRef/useForkRef';
import { cnMixCard } from '../../mixs/MixCard/MixCard';
import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

export const cardPropForm = ['round', 'square'] as const;
export type CardPropForm = typeof cardPropForm[number];
export const cardPropFormDefault: CardPropForm = cardPropForm[0];

export const cardPropSpace = [
  'm',
  'xs',
  's',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
] as const;
export type CardPropSpace = typeof cardPropSpace[number];

export const cardPropStatus = ['alert', 'success', 'warning'] as const;
export type CardPropStatus = typeof cardPropStatus[number] | string;

export type Props = {
  verticalSpace?: CardPropSpace;
  horizontalSpace?: CardPropSpace;
  status?: CardPropStatus;
  border?: boolean;
  form?: CardPropForm;
  shadow?: boolean;
  children?: React.ReactNode;
};

export const COMPONENT_NAME = 'Card' as const;

export const cnCard = cn('Card');

export const Card = forwardRefWithAs<Props>((props, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    verticalSpace,
    horizontalSpace,
    status,
    form = cardPropFormDefault,
    shadow = true,
    children,
    tabIndex,
    border,
    className,
    as = 'div',
    ...otherProps
  } = usePropsHandler(COMPONENT_NAME, props, cardRef);

  const Tag = as as string;

  return (
    <Tag
      tabIndex={tabIndex}
      ref={useForkRef([cardRef, ref])}
      className={cnCard(null, [
        cnMixCard({
          verticalSpace,
          horizontalSpace,
          shadow,
          form,
          status,
          border,
        }),
        className,
      ])}
      {...otherProps}
    >
      {children}
    </Tag>
  );
});
