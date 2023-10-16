import { useEffect, useRef, useState } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';

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
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const lastButtonRef = useRef<HTMLButtonElement>(null);

  const { prevButtonRef, nextButtonRef } = usePaginationKeys({
    containerEventListener,
    hotKeys,
  });

  const { width: firstWidth } = useComponentSize(firstButtonRef);
  const { width: prevWidth } = useComponentSize(prevButtonRef);
  const { width: nextWidth } = useComponentSize(nextButtonRef);
  const { width: lastWidth } = useComponentSize(lastButtonRef);

  const { width } = useComponentSize(wrapperRef);

  useEffect(() => {
    setMaxVisiblePages(
      Math.max(
        (width - firstWidth - prevWidth - nextWidth - lastWidth) /
          (itemSizeMap[size] + 2),
        3 + (showFirstPage ? 2 : 0) + (showLastPage ? 2 : 0),
      ),
    );
  }, [firstWidth, prevWidth, nextWidth, lastWidth, width, size]);

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
    prevButtonRef,
    nextButtonRef,
    lastButtonRef,
    firstButtonRef,
    wrapperRef,
    pages,
  };
};
