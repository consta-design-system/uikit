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

const getMinVisibleCount = (showFirstPage: boolean, showLastPage: boolean) => {
  if (showFirstPage || showLastPage) {
    return 5;
  }
  if (showFirstPage && showLastPage) {
    return 7;
  }

  return 3;
};

const range = (start: number, end: number) =>
  Array.from({ length: Math.abs(end - start + 1) }).map((_el, i) =>
    Math.floor(start + i),
  );

const generateArr = (params: {
  page: number;
  count: number;
  visibleCount: number;
  showFirstPage?: boolean;
  showLastPage?: boolean;
}) => {
  const {
    count,
    page,
    showFirstPage = false,
    showLastPage = false,
    visibleCount: visibleCountProp,
  } = params;

  let visibleCount = visibleCountProp;

  const minVisibleCount = getMinVisibleCount(showFirstPage, showLastPage);

  if (minVisibleCount >= count) {
    visibleCount = count;
  } else {
    visibleCount = Math.min(count, Math.max(visibleCountProp, minVisibleCount));
  }

  const boundaryStart = showFirstPage ? 2 : 0;
  const boundaryEnd = showLastPage ? 2 : 0;

  const res = [];

  const siblingsStart =
    Math.floor((visibleCount - boundaryEnd - boundaryStart) / 2) || 0;
  const siblingsEnd =
    Math.floor((visibleCount - boundaryEnd - boundaryStart - 1) / 2) || 0;

  let start = 1;
  let end = count;

  if (visibleCount - boundaryEnd >= page + siblingsEnd) {
    end = visibleCount - (showLastPage ? 2 : 0);
  } else if (page - siblingsStart > count - visibleCount + boundaryStart) {
    start = count - visibleCount + (showFirstPage ? 3 : 1);
  } else {
    start = page - siblingsStart;
    end = page + siblingsEnd;
  }

  if (showFirstPage && start !== 1) {
    res.push(1, '...');
  }
  res.push(...range(Math.floor(start), Math.floor(end)));

  if (showLastPage && end !== count) {
    res.push('...', count);
  }

  return res;
};

export const getPagesArray = (params: {
  currentPage: number;
  totalPages: number;
  visibleCount: number;
  showFirstPage?: boolean;
  showLastPage?: boolean;
}): PaginationItem[] => {
  const { totalPages, currentPage, ...rest } = params;

  const count = Math.max(totalPages, 1);
  const page = Math.min(count, Math.max(1, currentPage));

  return generateArr({ page, count, ...rest }).map((el, i) => {
    return {
      key: typeof el === 'string' ? totalPages + i : el,
      label: el.toString(),
      page: typeof el === 'string' ? i : el,
      active: typeof el === 'number' ? el === page : false,
      clickable: typeof el !== 'number',
    };
  });
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
