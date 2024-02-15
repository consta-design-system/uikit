import { useMemo } from 'react';

import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';

import { getPagesArray } from './helpers';
import {
  PaginationPropArrow,
  PaginationPropHotKey,
  PaginationPropSize,
  PaginationPropType,
} from './types';
import { usePaginationKeys } from './usePaginationKeys';

type UsePaginationItemsProps = {
  visibleCount?: number;
  value: number;
  items: number;
  showFirstPage?: boolean;
  showLastPage?: boolean;
  containerEventListener?: HTMLElement | Window;
  size: PaginationPropSize;
  hotKeys?: [PaginationPropHotKey?, PaginationPropHotKey?];
  arrows?: [PaginationPropArrow?, PaginationPropArrow?];
  outerMostArrows?: [PaginationPropArrow?, PaginationPropArrow?];
  type?: PaginationPropType;
  handleNext: (e: React.MouseEvent | KeyboardEvent) => void;
  handlePrevious: (e: React.MouseEvent | KeyboardEvent) => void;
};

export const itemSizeMap: Record<PaginationPropSize, number> = {
  l: 48,
  m: 40,
  s: 32,
  xs: 24,
};

const getElementWidth = (el: HTMLElement | null) =>
  el?.getBoundingClientRect().width ?? 0;

const hashArrows = (
  arrows: [PaginationPropArrow?, PaginationPropArrow?] | undefined,
) => arrows?.map(Boolean).join('-') || 'false-false';

export const usePaginationItems = (props: UsePaginationItemsProps) => {
  const {
    visibleCount,
    value,
    items,
    showFirstPage,
    showLastPage,
    containerEventListener,
    hotKeys,
    outerMostArrows,
    type,
    arrows,
    handleNext,
    handlePrevious,
  } = props;

  const refs = useRefs<HTMLDivElement>(20, [
    items,
    type,
    hashArrows(outerMostArrows),
    hashArrows(arrows),
  ]);

  const width = useResizeObserved(refs, getElementWidth);

  // расстояние между кнопками
  const gap = width[7] - width[5] - width[6];
  // внутренний отступ кнопки
  const buttonPadding = width[18] - width[19];
  // минимальная ширина кнопки
  const buttonMinWidth = width[5];
  // Максималяная ширина символа
  const maxSymbolSize = Math.max(
    width[8],
    width[9],
    width[10],
    width[11],
    width[12],
    width[13],
    width[14],
    width[15],
    width[16],
    width[17],
  );
  // разрешенная ширина
  const totalWidth =
    width[4] -
    (width[0] ? width[0] + gap : 0) -
    (width[1] ? width[1] + gap : 0) -
    (width[2] ? width[2] + gap : 0) -
    (width[3] ? width[3] + gap : 0);

  const pages = useMemo(
    () =>
      type === 'default' && buttonMinWidth
        ? getPagesArray(
            value,
            items,
            visibleCount || 0,
            showFirstPage || false,
            showLastPage || false,
            gap,
            buttonPadding,
            buttonMinWidth,
            maxSymbolSize,
            totalWidth,
          )
        : [],
    [
      type,
      value,
      items,
      visibleCount,
      showFirstPage,
      showLastPage,
      gap,
      buttonPadding,
      buttonMinWidth,
      maxSymbolSize,
      totalWidth,
    ],
  );

  usePaginationKeys({
    containerEventListener,
    hotKeys,
    handleNext,
    handlePrevious,
  });

  return [pages, refs, maxSymbolSize] as const;
};
