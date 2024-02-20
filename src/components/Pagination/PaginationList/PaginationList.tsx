import './PaginationList.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

import { defaultGetItemLabel, pageSeparatorLabel } from '../helpers';
import { PaginationItem } from '../PaginationItem';
import {
  PaginationBaseItemDefault,
  PaginationListComponent,
  PaginationListProps,
  paginationPropFormDefault,
  paginationPropSizeDefault,
} from '../types';

const cnPaginationList = cn('PaginationList');

const PaginationListRender = <ITEM extends PaginationBaseItemDefault>(
  props: PaginationListProps<ITEM>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items,
    getItemLabel = defaultGetItemLabel,
    getItemRef,
    getItemAs,
    getItemKey,
    getItemAttributes,
    getItemClickable,
    getItemOnClick,
    onItemClick,
    value,
    size = paginationPropSizeDefault,
    form = paginationPropFormDefault,
    className,
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnPaginationList(null, [className])}
    >
      {items.map((item) => {
        const attr = getItemAttributes?.(item) || {};
        return (
          <PaginationItem
            {...attr}
            className={cnPaginationList('Item', [attr?.className])}
            form={form}
            size={size}
            onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
              getItemOnClick?.(item)?.(e);
              onItemClick?.(item, { e });
            }}
            label={getItemLabel(item)}
            active={value ? getItemKey?.(item) === getItemKey?.(value) : false}
            ref={getItemRef?.(item)}
            as={getItemAs?.(item)}
            clickable={getItemClickable?.(item)}
            key={getItemKey(item)}
            style={{
              ['--pagination-item-label-lenght' as string]:
                item.label === pageSeparatorLabel ? 1 : item.label?.length,
            }}
          />
        );
      })}
    </div>
  );
};

export const PaginationList = forwardRef(
  PaginationListRender,
) as PaginationListComponent;
