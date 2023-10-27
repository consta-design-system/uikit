import './PaginationList.css';

import React, { forwardRef } from 'react';

import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

import { defaultGetItemLabel } from '../helpers';
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

  const renderItem = (item: ITEM) => {
    const handleClick: React.MouseEventHandler = (e) => {
      getItemOnClick?.(item)?.(e);
      onItemClick?.(item, { e, item });
    };

    const attributes = getItemAttributes?.(item) ?? {};

    const active = value ? getItemKey?.(item) === getItemKey?.(value) : false;

    return (
      <PaginationItem
        {...attributes}
        form={form}
        size={size}
        onClick={handleClick}
        label={getItemLabel(item)}
        active={active}
        ref={getItemRef?.(item)}
        as={getItemClickable?.(item) ? 'div' : getItemAs?.(item)}
      />
    );
  };

  return (
    <div
      ref={ref}
      className={cnPaginationList(null, [
        className,
        cnMixFlex({ gap: '3xs', wrap: 'nowrap' }),
      ])}
      {...otherProps}
    >
      {items.map((item) => (
        <React.Fragment
          key={cnPaginationList('Item', { key: getItemKey(item) })}
        >
          {renderItem(item)}
        </React.Fragment>
      ))}
    </div>
  );
};

export const PaginationList = forwardRef(
  PaginationListRender,
) as PaginationListComponent;
