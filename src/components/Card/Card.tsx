import './Card.css';

import React from 'react';

import { cnMixCard } from '../../mixs/MixCard/MixCard';
import { cn } from '../../utils/bem';
import { forwardRefWithAs } from '../../utils/types/PropsWithAsAttributes';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

export const cardPropForm = ['round', 'square'] as const;
export type CardPropForm = typeof cardPropForm[number];
export const cardPropFormDefault: CardPropForm = cardPropForm[0];

export const cardPropSize = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
export type CardPropSize = typeof cardPropSize[number];
export const cardPropSizeDefault: CardPropSize = cardPropSize[0];

export const cardPropState = ['alert', 'success', 'warning'] as const;
export type CardPropState = typeof cardPropState[number];
export const cardPropStateDefault: CardPropState = cardPropState[0];

export type Props = {
  verticalSpace?: CardPropSize;
  horizontalSpace?: CardPropSize;
  state?: CardPropState;
  form?: CardPropForm;
  hasShadow?: boolean;
  children?: React.ReactNode;
};

export const cnCard = cn('Card');

export const Card = forwardRefWithAs<Props>((props, ref) => {
  const {
    verticalSpace = cardPropSizeDefault,
    horizontalSpace = cardPropSizeDefault,
    state,
    form = cardPropFormDefault,
    hasShadow = true,
    children,
    tabIndex,
    className,
    as = 'div',
    ...otherProps
  } = usePropsHandler(cnCard(), props);

  const Tag = as as string;

  return (
    <Tag
      tabIndex={tabIndex}
      ref={ref}
      className={cnCard({}, [
        cnMixCard({ verticalSpace, horizontalSpace, shadow: hasShadow, form, state }),
        className,
      ])}
      {...otherProps}
    >
      {children}
    </Tag>
  );
});
