import './PaginationBase.css';

import React, { forwardRef } from 'react';

import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

import { paginationArrowIconsMap, withDefaultGetters } from '../helpers';
import { PaginationArrow } from '../PaginationArrow';
import { PaginationList } from '../PaginationList';
import {
  PaginationArrowTypes,
  PaginationBaseComponent,
  PaginationBaseItemDefault,
  PaginationBasePropArrow,
  PaginationBaseProps,
  paginationPropFormDefault,
  PaginationPropHotKey,
  PaginationPropOnItemClick,
  paginationPropSizeDefault,
} from '../types';
import { usePaginationKeys } from '../usePaginationKeys';

const cnPaginationBase = cn('PaginationBase');

const PaginationBaseRender = (
  props: PaginationBaseProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items = [],
    value,
    size = paginationPropSizeDefault,
    form = paginationPropFormDefault,
    containerEventListener,
    onChange,
    getItemKey,
    getItemAs,
    getItemAttributes,
    getItemClickable,
    getItemLabel,
    getItemOnClick,
    getItemRef,
    className,
    arrows,
    hotKeys,
    outerMostArrows,
    ...otherProps
  } = withDefaultGetters(props);

  const { prevButtonRef, nextButtonRef } = usePaginationKeys({
    containerEventListener,
    hotKeys,
  });

  const renderButton = (
    item: PaginationBasePropArrow,
    type: PaginationArrowTypes,
    ref: React.Ref<HTMLButtonElement> | undefined,
    hotKey?: PaginationPropHotKey,
  ) => {
    if (!item) {
      return null;
    }
    const {
      onClick,
      icon = paginationArrowIconsMap[type],
      label,
      disabled,
    } = item;
    const orientation =
      type === 'first' || type === 'previous' ? 'start' : 'end';

    return (
      <PaginationArrow
        label={label}
        icon={icon}
        disabled={disabled}
        ref={ref}
        size={size}
        form={form}
        caption={hotKey?.label}
        orientation={orientation}
        onClick={onClick}
      />
    );
  };

  const onItemClick: PaginationPropOnItemClick<PaginationBaseItemDefault> = (
    item,
    { e },
  ) => {
    onChange?.(item, { e, value: item });
  };

  return (
    <div
      className={cnPaginationBase(null, [
        className,
        cnMixFlex({ wrap: 'nowrap', gap: '3xs' }),
      ])}
      ref={ref}
      {...otherProps}
    >
      {outerMostArrows?.[0] &&
        renderButton(outerMostArrows[0], 'first', undefined)}
      {arrows?.[0] &&
        renderButton(arrows[0], 'previous', prevButtonRef, hotKeys?.[0])}
      <PaginationList
        items={items}
        size={size}
        form={form}
        value={value}
        onItemClick={onItemClick}
        getItemKey={getItemKey}
        getItemAs={getItemAs}
        getItemAttributes={getItemAttributes}
        getItemClickable={getItemClickable}
        getItemLabel={getItemLabel}
        getItemOnClick={getItemOnClick}
        getItemRef={getItemRef}
      />
      {arrows?.[1] &&
        renderButton(arrows[1], 'next', nextButtonRef, hotKeys?.[1])}
      {outerMostArrows?.[1] &&
        renderButton(outerMostArrows[1], 'last', undefined)}
    </div>
  );
};

export const PaginationBase = forwardRef(
  PaginationBaseRender,
) as PaginationBaseComponent;
