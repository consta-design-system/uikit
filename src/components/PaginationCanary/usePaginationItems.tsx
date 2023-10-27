import { useEffect, useRef, useState } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useRefs } from '##/hooks/useRefs';
import { useResizeObserved } from '##/hooks/useResizeObserved';

import { getPagesArray } from './helpers';
import {
  PaginationItem,
  PaginationPropHotKey,
  PaginationPropSize,
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
};

export const itemSizeMap: Record<PaginationPropSize, number> = {
  l: 48,
  m: 40,
  s: 32,
  xs: 24,
};

const getElementSize = (el: HTMLElement | null) => el?.offsetWidth ?? 0;

export const usePaginationItems = (props: UsePaginationItemsProps) => {
  const {
    visibleCount,
    value,
    items,
    showFirstPage,
    showLastPage,
    containerEventListener,
    size,
    hotKeys,
  } = props;
  const [pages, setPages] = useState<PaginationItem[]>([]);
  const [maxVisiblePages, setMaxVisiblePages] = useState(7);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const refs = useRefs<HTMLButtonElement>(4);

  const [firstWidth, prevWidth, nextWidth, lastWidth] = useResizeObserved(
    refs,
    getElementSize,
  );

  usePaginationKeys({
    containerEventListener,
    hotKeys,
    prevButtonRef: refs[1],
    nextButtonRef: refs[2],
  });

  const { width } = useComponentSize(wrapperRef);

  useEffect(() => {
    setMaxVisiblePages(
      Math.max(
        Math.floor(
          (width - firstWidth - prevWidth - nextWidth - lastWidth) /
            (itemSizeMap[size] + 2),
        ),
        3 + (showFirstPage ? 2 : 0) + (showLastPage ? 2 : 0),
      ),
    );
  }, [pages, firstWidth, prevWidth, nextWidth, lastWidth, width, size]);

  useEffect(() => {
    setPages(
      getPagesArray({
        currentPage: value,
        totalPages: items,
        visibleCount: visibleCount ?? maxVisiblePages,
        showFirstPage,
        showLastPage,
      }),
    );
  }, [
    visibleCount,
    showFirstPage,
    showLastPage,
    value,
    items,
    maxVisiblePages,
  ]);

  return {
    buttonRefs: refs,
    wrapperRef,
    pages,
  };
};
