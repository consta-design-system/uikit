import { IconComponent } from '@consta/icons/Icon';
import { IconArrowFirst } from '@consta/icons/IconArrowFirst';
import { IconArrowLast } from '@consta/icons/IconArrowLast';
import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';

import {
  PaginationArrowTypes,
  PaginationBaseItemDefault,
  PaginationBaseProps,
  PaginationItem,
  PaginationPropGetItemAs,
  PaginationPropGetItemAttributes,
  PaginationPropGetItemClickable,
  PaginationPropGetItemKey,
  PaginationPropGetItemLabel,
  PaginationPropGetItemOnClick,
  PaginationPropGetItemRef,
} from './types';

export const defaultGetItemLabel: PaginationPropGetItemLabel<
  PaginationBaseItemDefault
> = (item) => item.label;
export const defaultGetItemKey: PaginationPropGetItemKey<
  PaginationBaseItemDefault
> = (item) => item.key;
export const defaultGetItemClickable: PaginationPropGetItemClickable<
  PaginationBaseItemDefault
> = (item) => item.clickable;
const defaultGetItemAs: PaginationPropGetItemAs<PaginationBaseItemDefault> = (
  item,
) => item.as;
const defaultGetItemAttributes: PaginationPropGetItemAttributes<
  PaginationBaseItemDefault
> = (item) => item.attributes;
const defaultGetItemRef: PaginationPropGetItemRef<PaginationBaseItemDefault> = (
  item,
) => item.ref;
const defaultGetItemOnClick: PaginationPropGetItemOnClick<
  PaginationBaseItemDefault
> = (item) => item.onClick;

export const withDefaultGetters = (props: PaginationBaseProps) => ({
  ...props,
  getItemLabel: props.getItemLabel ?? defaultGetItemLabel,
  getItemKey: props.getItemKey ?? defaultGetItemKey,
  getItemClickable: props.getItemClickable ?? defaultGetItemClickable,
  getItemOnClick: props.getItemOnClick ?? defaultGetItemOnClick,
  getItemAs: props.getItemAs ?? defaultGetItemAs,
  getItemAttributes: props.getItemAttributes ?? defaultGetItemAttributes,
  getItemRef: props.getItemRef ?? defaultGetItemRef,
});

export const getPagesArray = (params: {
  currentPage: number;
  totalPages: number;
  visibleCount: number;
  showFirstPage?: boolean;
  showLastPage?: boolean;
}): PaginationItem[] => {
  const {
    totalPages,
    currentPage,
    showFirstPage,
    showLastPage,
    visibleCount: visibleCountProp,
  } = params;

  const visibleCount = Math.min(visibleCountProp, totalPages);

  const delta = 2; // Количество элементов которое нужно пройти чтоб появилось многоточие
  const offset = 0; // Количество страниц перед выбранной

  const showFirst =
    showFirstPage && visibleCount < totalPages && currentPage > delta + offset;
  const showLast =
    showLastPage &&
    visibleCount < totalPages &&
    currentPage + visibleCount - (showFirst ? 2 : 0) - delta < totalPages;

  const pages: PaginationItem[] = [];

  if (showFirst) {
    pages.push({
      key: 1,
      page: 1,
      label: '1',
    });
    pages.push({
      key: 2,
      page: 2,
      clickable: false,
      label: '...',
    });
  }

  const stopPage = Math.min(
    currentPage <= delta
      ? visibleCount - (showLast ? 2 : 0)
      : Math.max(currentPage, 1) -
          offset +
          visibleCount -
          (showLast ? 2 : 0) -
          (showFirst ? 2 : 0) -
          1,
    totalPages - (showLast ? 2 : 0),
  );
  const startPage =
    currentPage + visibleCount - (showFirst ? 2 : 0) - delta < totalPages
      ? Math.max(currentPage <= delta ? 1 : currentPage, 1) - offset
      : totalPages - visibleCount + (showFirst ? 2 : 0) + 1;

  for (let i = startPage; i <= stopPage; i++) {
    const fixedIndex = Number(i.toFixed());
    pages.push({
      key: fixedIndex,
      page: fixedIndex,
      label: fixedIndex.toString(),
      active: fixedIndex === currentPage,
    });
  }

  if (showLast) {
    pages.push({
      key: totalPages - 1,
      page: totalPages - 1,
      label: '...',
      clickable: false,
    });
    pages.push({
      key: totalPages,
      page: totalPages,
      label: totalPages.toString(),
    });
  }

  return pages;
};

export const paginationArrowIconsMap: Record<
  PaginationArrowTypes,
  IconComponent
> = {
  first: IconArrowFirst,
  previous: IconArrowLeft,
  next: IconArrowRight,
  last: IconArrowLast,
};

export const getListValue = (page: number): PaginationItem => ({
  key: page,
  page,
  label: page.toString(),
});
