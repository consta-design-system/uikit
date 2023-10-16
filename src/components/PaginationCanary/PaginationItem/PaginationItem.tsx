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
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    as = 'div',
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
      ref={ref}
    >
      {label}
    </Tag>
  );
};

export const PaginationItem = forwardRef(
  PaginationItemRender,
) as PaginationItemComponent;
