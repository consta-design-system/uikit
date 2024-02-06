import './Pagination.css';

import React, { forwardRef, useCallback } from 'react';

import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';
import { cn } from '##/utils/bem';

import {
  defaultGetItemClickable,
  defaultGetItemKey,
  guardCurrentPage,
  paginationArrowIconsMap,
} from './helpers';
import { PaginationArrow } from './PaginationArrow';
import { PaginationList } from './PaginationList';
import { PaginationNumberInput } from './PaginationNumberInput';
import { PaginationSizeCalculateHelper } from './PaginationSizeCalculateHelper';
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

const cnPagination = cn('Pagination');

const PaginationRender = <TYPE extends PaginationPropType>(
  props: PaginationProps<TYPE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items = 0,
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
    visibleCount,
    className,
    style,
    getItemAs,
    getItemAttributes,
    getItemRef,
    ...otherProps
  } = props;

  const valueRef = useMutableRef(guardCurrentPage(valueProp, items));
  const onChangeRef = useMutableRef(onChange);

  const onItemClick: PaginationPropOnItemClick<PaginationItem> = useCallback(
    ({ key }, { e }) => {
      if (key !== valueRef.current && typeof key === 'number') {
        onChangeRef.current?.(key, { e });
      }
    },
    [],
  );

  const handleNext = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      onChangeRef.current?.(Math.min(valueRef.current + 1, items), { e });
    },
    [items],
  );

  const handlePrevious = useCallback((e: React.MouseEvent | KeyboardEvent) => {
    onChangeRef.current?.(Math.max(valueRef.current - 1, 1), { e });
  }, []);

  const handlefirst = useCallback((e: React.MouseEvent | KeyboardEvent) => {
    onChangeRef.current?.(1, { e });
  }, []);

  const handleLast = useCallback(
    (e: React.MouseEvent | KeyboardEvent) => {
      onChangeRef.current?.(items, { e });
    },
    [items],
  );

  const [pages, refs, symbolSize] = usePaginationItems({
    showFirstPage,
    showLastPage,
    items,
    visibleCount,
    size,
    value: valueRef.current,
    containerEventListener,
    hotKeys,
    outerMostArrows,
    type,
    arrows,
    handleNext,
    handlePrevious,
  });

  const rootRef = useForkRef([refs[4], ref]);

  const renderArrow = (
    item: PaginationPropArrow,
    type: PaginationArrowTypes,
    ref: React.Ref<HTMLButtonElement> | undefined,
    hotKey: PaginationPropHotKey | undefined,
    onClick?: React.MouseEventHandler,
  ) => {
    const flag =
      type === 'first' || type === 'previous'
        ? valueRef.current > 1
        : valueRef.current < items;
    const orientation =
      type === 'first' || type === 'previous' ? 'start' : 'end';
    if (typeof item === 'object') {
      const { label, icon = paginationArrowIconsMap[type] } = item;

      return (
        <PaginationArrow
          label={label}
          icon={icon}
          disabled={!flag}
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

  if (items <= 0) {
    return null;
  }

  return (
    <nav
      {...otherProps}
      className={cnPagination({ type }, [className])}
      ref={rootRef}
      style={{
        ['--pagination-symbol-size' as string]: `${symbolSize}px`,
        ...style,
      }}
    >
      {(outerMostArrows?.[0] || arrows?.[0]) && (
        <>
          {outerMostArrows?.[0] &&
            renderArrow(
              outerMostArrows[0],
              'first',
              refs[0] as unknown as React.RefObject<HTMLButtonElement>,
              undefined,
              handlefirst,
            )}
          {arrows?.[0] &&
            renderArrow(
              arrows[0],
              'previous',
              refs[1] as unknown as React.RefObject<HTMLButtonElement>,
              hotKeys?.[0],
              handlePrevious,
            )}
        </>
      )}

      {type === 'default' ? (
        <PaginationList
          items={pages}
          form={form}
          size={size}
          onItemClick={onItemClick}
          value={{
            key: valueRef.current,
            label: valueRef.current.toString(),
            clickable: true,
          }}
          getItemKey={defaultGetItemKey}
          getItemClickable={defaultGetItemClickable}
          getItemAs={getItemAs}
          getItemAttributes={getItemAttributes}
          getItemRef={getItemRef}
        />
      ) : (
        <PaginationNumberInput
          form={form}
          size={size}
          total={items}
          value={valueRef.current}
          onChange={onChange}
          getTotalLabel={getTotalLabel}
        />
      )}
      {(arrows?.[1] || outerMostArrows?.[1]) && (
        <>
          {arrows?.[1] &&
            renderArrow(
              arrows[1],
              'next',
              refs[2] as unknown as React.RefObject<HTMLButtonElement>,
              hotKeys?.[1],
              handleNext,
            )}
          {outerMostArrows?.[1] &&
            renderArrow(
              outerMostArrows[1],
              'last',
              refs[3] as unknown as React.RefObject<HTMLButtonElement>,
              undefined,
              handleLast,
            )}
        </>
      )}
      {type === 'default' && (
        <PaginationSizeCalculateHelper refs={refs} size={size} />
      )}
    </nav>
  );
};

export const Pagination = forwardRef(PaginationRender) as PaginationComponent;
