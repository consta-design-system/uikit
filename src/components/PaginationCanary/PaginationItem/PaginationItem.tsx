import './PaginationItem.css';

import React, { forwardRef } from 'react';

import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixFocus } from '##/mixs/MixFocus';
import { cn } from '##/utils/bem';

import {
  PaginationItemComponent,
  PaginationItemProps,
  paginationPropFormDefault,
  paginationPropSizeDefault,
} from '../types';

const cnPaginationItem = cn('PaginationItem');

const PaginationItemRender = (
  props: PaginationItemProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const {
    as = 'button',
    label,
    active,
    clickable = true,
    size = paginationPropSizeDefault,
    form = paginationPropFormDefault,
    className,
    children,
    ...otherProps
  } = props;

  const Tag = clickable ? as : 'div';

  return (
    <Tag
      {...otherProps}
      className={cnPaginationItem({ size, form, active, clickable }, [
        className,
        cnMixFlex({ align: 'center', justify: 'center', flex: 'inline-flex' }),
        cnMixFocus(),
      ])}
      // @ts-ignore Так как иначе ругается на ref из-за того что может быть как div так и button
      ref={ref}
    >
      {label}
    </Tag>
  );
};

export const PaginationItem = forwardRef(
  PaginationItemRender,
) as PaginationItemComponent;
