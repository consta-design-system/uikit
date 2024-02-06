import { IconComponent } from '@consta/icons/Icon';
import { IconArrowFirst } from '@consta/icons/IconArrowFirst';
import { IconArrowLast } from '@consta/icons/IconArrowLast';
import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';

import { range } from '##/utils/array';

import {
  PaginationArrowTypes,
  PaginationBaseItemDefault,
  PaginationItem,
  PaginationPropGetItemClickable,
  PaginationPropGetItemKey,
  PaginationPropGetItemLabel,
} from './types';

export const defaultGetItemLabel: PaginationPropGetItemLabel<
  PaginationBaseItemDefault
> = (item) => item.label;
export const defaultGetItemKey: PaginationPropGetItemKey<
  PaginationBaseItemDefault
> = (item) => item.key;
export const defaultGetItemClickable: PaginationPropGetItemClickable<
  PaginationBaseItemDefault
> = (item) => item.clickable ?? true;

export const firstPageSeparator = '<_';
export const lastPageSeparator = '_>';
export const pageSeparatorLabel = '...';
export const guardCurrentPage = (
  currentPage: number | undefined,
  totalPages: number,
) => Math.floor(Math.max(1, Math.min(currentPage || 0, totalPages)));

export const getPagesArrayByVisibleCount = (
  currentPage: number,
  totalPages: number,
  visibleCountProp: number,
  showFirstPage?: boolean,
  showLastPage?: boolean,
): PaginationItem[] => {
  const visibleCount = Math.floor(Math.min(visibleCountProp, totalPages));
  const page = guardCurrentPage(currentPage, totalPages);
  const visibleSegmentStartToCenter = Math.ceil(visibleCount / 2);
  const visibleSegmentEndToCenter = visibleCount - visibleSegmentStartToCenter;
  const slideStart = Math.max(0, page - visibleSegmentStartToCenter);

  return range(visibleCount).map((i) => {
    const el =
      i +
      slideStart +
      1 -
      Math.max(0, page + visibleSegmentEndToCenter - totalPages);

    if (visibleCount >= 5 && visibleCount < totalPages) {
      if (showFirstPage && i === 0 && page - visibleSegmentStartToCenter > 0) {
        return {
          key: 1,
          label: '1',
          clickable: true,
        };
      }
      if (showFirstPage && i === 1 && page - visibleSegmentStartToCenter > 0) {
        return {
          key: firstPageSeparator,
          label: pageSeparatorLabel,
          clickable: false,
        };
      }
      if (
        showLastPage &&
        i === visibleCount - 1 &&
        page + visibleSegmentEndToCenter < totalPages
      ) {
        return {
          key: totalPages,
          label: totalPages.toString(),
          clickable: true,
        };
      }
      if (
        showLastPage &&
        i === visibleCount - 2 &&
        page + visibleSegmentEndToCenter < totalPages
      ) {
        return {
          key: lastPageSeparator,
          label: pageSeparatorLabel,
          clickable: false,
        };
      }
    }

    return {
      key: el,
      label: el.toString(),
      clickable: true,
    };
  });
};

type GetPagesArray = (
  currentPage: number,
  totalPages: number,
  visibleCount: number,
  showFirstPage: boolean,
  showLastPage: boolean,
  gap: number,
  buttonPadding: number,
  buttonMinWidth: number,
  maxSymbolSize: number,
  totalWidth: number,
) => PaginationItem[];

type GetPagesArrayByWidth = (
  currentPage: number,
  totalPages: number,
  showFirstPage: boolean,
  showLastPage: boolean,
  gap: number,
  buttonPadding: number,
  buttonMinWidth: number,
  maxSymbolSize: number,
  totalWidth: number,
) => PaginationItem[];

export const getPagesArrayByWidth: GetPagesArrayByWidth = (
  currentPageArg,
  totalPages,
  showFirstPage,
  showLastPage,
  gap: number,
  buttonPadding: number,
  buttonMinWidth: number,
  maxSymbolSize: number,
  totalWidth: number,
) => {
  const currentPage = guardCurrentPage(currentPageArg, totalPages);

  let w = totalWidth;
  // направлеине добавления кнопки, true - влево, false - вправо
  let direction = false;
  // индекс добавляемой кнопки относительно от выбранной
  let leftIndex = 0;
  let rightIndex = 1;
  let pages: (PaginationItem & { buttonWidth: number })[] = [];

  const getButtonWidth = (label: number, withGap: boolean) => {
    return (
      Math.max(
        label.toString().length * maxSymbolSize + buttonPadding,
        buttonMinWidth,
      ) + (withGap ? gap : 0)
    );
  };

  while (w > 0 && pages.length < totalPages) {
    const add = direction ? currentPage + rightIndex : currentPage - leftIndex;

    const buttonWidth: number = getButtonWidth(add, Boolean(pages.length));

    if (w - buttonWidth >= 0 && add <= totalPages && add >= 1) {
      const el = {
        key: add,
        label: add.toString(),
        clickable: true,
        buttonWidth,
      };

      if (direction) {
        pages.push(el);
        rightIndex += 1;
      } else {
        pages.unshift(el);
        leftIndex += 1;
      }
    }
    direction = !direction;

    w -= add <= totalPages && add >= 1 ? buttonWidth : 0;
  }

  if ((showFirstPage || showLastPage) && pages.length >= 5) {
    const moreButtonWidth = getButtonWidth(1, true);
    const firstButtonWidth = getButtonWidth(1, true);
    const lastButtonWidth = getButtonWidth(totalPages, true);

    let isAddFirstPage = false;
    let isAddlastPage = false;

    if (showFirstPage && pages[0].key !== 1) {
      let array = [...pages];

      while (array.length > 3) {
        if (array[0].key === currentPage) {
          break;
        }

        const slicedArray = array.slice(1);

        if (
          slicedArray
            .map((el) => el.buttonWidth)
            .reduce((previous, currentValue) => previous + currentValue) +
            firstButtonWidth +
            moreButtonWidth <=
          totalWidth
        ) {
          isAddFirstPage = true;
          pages = [...slicedArray];
          break;
        }

        array = slicedArray;
      }
    }

    if (showLastPage && pages[pages.length - 1].key !== totalPages) {
      let array = [...pages];

      while (array.length > 3) {
        if (array[array.length - 1].key === totalPages) {
          break;
        }

        const slicedArray = array.slice(0, -1);

        if (
          slicedArray
            .map((el) => el.buttonWidth)
            .reduce((previous, currentValue) => previous + currentValue) +
            lastButtonWidth +
            moreButtonWidth +
            (isAddFirstPage ? firstButtonWidth + moreButtonWidth : 0) <=
          totalWidth
        ) {
          isAddlastPage = true;
          pages = [...slicedArray];
          break;
        }

        array = slicedArray;
      }
    }

    pages = [
      ...(isAddFirstPage
        ? [
            {
              key: 1,
              label: '1',
              clickable: true,
              buttonWidth: firstButtonWidth,
            },
            {
              key: firstPageSeparator,
              label: pageSeparatorLabel,
              buttonWidth: moreButtonWidth,
              clickable: false,
            },
          ]
        : []),
      ...pages,
      ...(isAddlastPage
        ? [
            {
              key: lastPageSeparator,
              label: pageSeparatorLabel,
              buttonWidth: moreButtonWidth,
              clickable: false,
            },
            {
              key: totalPages,
              label: totalPages.toString(),
              clickable: true,
              buttonWidth: firstButtonWidth,
            },
          ]
        : []),
    ];
  }

  const returned: PaginationItem[] = pages.map(({ key, label, clickable }) => ({
    key,
    label,
    clickable,
  }));

  return returned;
};

export const getPagesArray: GetPagesArray = (
  currentPage,
  totalPages = 1,
  visibleCount,
  showFirstPage,
  showLastPage,
  gap,
  buttonPadding,
  buttonMinWidth,
  maxSymbolSize,
  totalWidth,
) => {
  return visibleCount
    ? getPagesArrayByVisibleCount(
        currentPage,
        totalPages,
        visibleCount,
        showFirstPage,
        showLastPage,
      )
    : getPagesArrayByWidth(
        currentPage,
        totalPages,
        showFirstPage,
        showLastPage,
        gap,
        buttonPadding,
        buttonMinWidth,
        maxSymbolSize,
        totalWidth,
      );
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
