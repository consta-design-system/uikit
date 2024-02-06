import './PaginationItem.css';

import React, { forwardRef } from 'react';

import { cnButton } from '##/components/Button';
import { cnMixFocus } from '##/mixs/MixFocus';
import { cn } from '##/utils/bem';

import {
  PaginationItemComponent,
  PaginationItemProps,
  paginationPropFormDefault,
  paginationPropSizeDefault,
} from '../types';

export const cnPaginationItem = cn('PaginationItem');

const PaginationItemRender = (
  props: PaginationItemProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const {
    as: Tag = 'button',
    label,
    active,
    size = paginationPropSizeDefault,
    form = paginationPropFormDefault,
    className,
    children,
    clickable,
    ...otherProps
  } = props;

  return (
    <Tag
      {...otherProps}
      className={cnPaginationItem({ active, clickable, size }, [
        className,
        cnButton({ view: 'clear', size, form, onlyIcon: true }),
        clickable ? cnMixFocus() : undefined,
      ])}
      ref={ref}
      tabIndex={clickable ? undefined : -1}
    >
      {label}
    </Tag>
  );
};

export const PaginationItem = forwardRef(
  PaginationItemRender,
) as PaginationItemComponent;
