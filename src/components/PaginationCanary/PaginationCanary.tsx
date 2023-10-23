import './Pagination.css';

import React, { forwardRef, useMemo } from 'react';

import { useForkRef } from '##/hooks/useForkRef';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnCanary } from '##/utils/bem';

import {
  defaultGetItemClickable,
  defaultGetItemKey,
  defaultGetItemLabel,
  getListValue,
  paginationArrowIconsMap,
} from './helpers';
import { PaginationArrow } from './PaginationArrow';
import { PaginationList } from './PaginationList';
import { PaginationNumberInput } from './PaginationNumberInput';
import {
  PaginationArrowTypes,
  PaginationComponent,
  PaginationItem,
  PaginationPropArrow,
  paginationPropFormDefault,
  PaginationPropHotKey,
  PaginationPropOnItemClick,
  PaginationProps,
  paginationPropSizeDefault,
  PaginationPropType,
  paginationPropTypeDefault,
} from './types';
import { usePaginationItems } from './usePaginationItems';

const cnPagination = cnCanary('Pagination');

const PaginationRender = <TYPE extends PaginationPropType>(
  props: PaginationProps<TYPE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items: itemsProp = 0,
    value: valueProp,
    onChange,
    size = paginationPropSizeDefault,
    form = paginationPropFormDefault,
    type = paginationPropTypeDefault,
    containerEventListener = window,
    getTotalLabel,
    outerMostArrows,
    arrows,
    hotKeys,
    showFirstPage,
    showLastPage,
    visibleCount: visibleCountProp,
    className,
    ...otherProps
  } = props;

  const value = Math.max(valueProp ?? 0, 0);
  const items = Math.max(itemsProp, 0);
  const visibleCount = visibleCountProp
    ? Math.max(visibleCountProp, 1)
    : undefined;

  const renderButton = (
    item: PaginationPropArrow,
    type: PaginationArrowTypes,
    ref: React.Ref<HTMLButtonElement> | undefined,
    hotKey: PaginationPropHotKey | undefined,
    onClick?: React.MouseEventHandler,
  ) => {
    const flag =
      type === 'first' || type === 'previous' ? value > 1 : value < items;
    const orientation =
      type === 'first' || type === 'previous' ? 'start' : 'end';
    if (typeof item === 'object') {
      const { disabled, label, icon = paginationArrowIconsMap[type] } = item;

      return (
        <PaginationArrow
          label={label}
          icon={icon}
          disabled={disabled || !flag}
          size={size}
          form={form}
          ref={ref}
          orientation={orientation}
          caption={hotKey?.label}
          onClick={onClick}
        />
      );
    }
    return (
      <PaginationArrow
        orientation={orientation}
        icon={typeof item === 'function' ? item : paginationArrowIconsMap[type]}
        disabled={!flag}
        size={size}
        form={form}
        ref={ref}
        onClick={onClick}
      />
    );
  };

  const handleButtonClick =
    (type: PaginationArrowTypes) => (e: React.MouseEvent) => {
      let newValue = items;
      if (type === 'first') {
        newValue = 1;
      }
      if (type === 'previous') {
        newValue = Math.max(value - 1, 1);
      }
      if (type === 'next') {
        newValue = Math.min(value + 1, items);
      }
      onChange?.(newValue, { e, value: newValue });
    };

  const {
    pages,
    wrapperRef,
    nextButtonRef,
    lastButtonRef,
    firstButtonRef,
    prevButtonRef,
  } = usePaginationItems({
    showFirstPage,
    showLastPage,
    items,
    visibleCount,
    size,
    value,
    containerEventListener,
    hotKeys,
  });

  const onItemClick: PaginationPropOnItemClick<PaginationItem> = (
    { page },
    { e },
  ) => {
    if (page !== value) {
      onChange?.(page, { e, value: page });
    }
  };

  const navRef = useForkRef([ref, wrapperRef]);

  const listValue = useMemo(() => getListValue(value), [value]);

  if (items === 0) {
    return null;
  }

  return (
    <nav
      className={cnPagination({ size, form }, [
        className,
        cnMixFlex({ wrap: 'nowrap', gap: type === 'input' ? 'xs' : '3xs' }),
      ])}
      ref={navRef}
      {...otherProps}
    >
      {outerMostArrows?.[0] &&
        renderButton(
          outerMostArrows[0],
          'first',
          firstButtonRef,
          undefined,
          handleButtonClick('first'),
        )}
      {arrows?.[0] &&
        renderButton(
          arrows[0],
          'previous',
          prevButtonRef,
          hotKeys?.[0],
          handleButtonClick('previous'),
        )}
      {type === 'default' ? (
        <PaginationList
          items={pages}
          form={form}
          size={size}
          value={listValue}
          getItemKey={defaultGetItemKey}
          getItemLabel={defaultGetItemLabel}
          getItemClickable={defaultGetItemClickable}
          onItemClick={onItemClick}
        />
      ) : (
        <PaginationNumberInput
          form={form}
          size={size}
          total={items}
          value={!valueProp ? undefined : value}
          onChange={onChange}
          getTotalLabel={getTotalLabel}
        />
      )}
      {arrows?.[1] &&
        renderButton(
          arrows[1],
          'next',
          nextButtonRef,
          hotKeys?.[1],
          handleButtonClick('next'),
        )}
      {outerMostArrows?.[1] &&
        renderButton(
          outerMostArrows[1],
          'last',
          lastButtonRef,
          undefined,
          handleButtonClick('last'),
        )}
    </nav>
  );
};

export const Pagination = forwardRef(PaginationRender) as PaginationComponent;
