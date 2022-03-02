import React from 'react';

import { isNotNil, isNumber, isString } from '../../utils/type-guards';

import { ColumnWidth, SortingState, TableColumn, TableRow, TableTreeRow } from './Table';

export const Order = {
  ASC: 'ASC',
  asc: 'asc',
  DESC: 'DESC',
  desc: 'desc',
} as const;

export type OrderType = typeof Order[keyof typeof Order];

export type Position = {
  colSpan?: number;
  rowSpan?: number;
  level: number;
  gridIndex: number;
  topHeaderGridIndex: number;
  smallTextSize?: boolean;
  height?: number;
};

export type Header<T extends TableRow> = TableColumn<T> & { position: Position };

export type HeaderData<T extends TableRow> = {
  headers: Array<Header<T>>[];
  flattenedHeaders: Array<Header<T>>;
  lowHeaders: Array<Header<T>>;
  headerRowsRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
  headerRowsHeights: Array<number>;
  headerColumnsHeights: Array<number>;
  resizerTopOffsets: Array<number>;
};

export const getColumnsSize = (sizes: ColumnWidth[]): string => {
  return sizes.map((s) => (isNumber(s) ? `${s}px` : `auto`)).join(' ');
};

export const getColumnLeftOffset = ({
  columnIndex,
  resizedColumnWidths,
  initialColumnWidths,
}: {
  columnIndex: number;
  resizedColumnWidths: Array<number | undefined>;
  initialColumnWidths: number[];
}): number => {
  const selectedColumns = initialColumnWidths
    .slice(0, columnIndex)
    .map((size, index) => resizedColumnWidths[index] || size);

  return selectedColumns.reduce((acc, column) => acc + column, 0);
};

export const createSortingState = <T extends TableRow>(
  by: keyof T,
  order?: OrderType,
  sortFn?: (a: T[keyof T], b: T[keyof T]) => number,
): SortingState<T> => {
  if (!isString(order)) {
    return null;
  }

  return { by, order: order.toLowerCase(), sortFn } as SortingState<T>;
};

export const getNewSorting = <T extends TableRow>(
  currentSorting: SortingState<T>,
  newField: keyof T,
  sortFn?: (a: T[keyof T], b: T[keyof T]) => number,
): SortingState<T> => {
  if (!currentSorting || currentSorting.by !== newField) {
    return {
      by: newField,
      order: 'asc',
      sortFn,
    };
  }

  if (currentSorting.order === 'asc') {
    return {
      by: newField,
      order: 'desc',
      sortFn,
    };
  }

  return null;
};

export const getMaxLevel = <T extends TableRow>(columns: Array<TableColumn<T>>) => {
  let count = 0;

  const traverse = (cols: Array<TableColumn<T>>, level = 1) => {
    if (level > count) count = level;
    cols.forEach((item: TableColumn<T>) => {
      if (item.columns) {
        traverse(item.columns, level + 1);
      }
    });
  };

  traverse(columns);

  return count;
};

const getLastChildrenCount = <T extends TableRow>(columns: Array<TableColumn<T>>) => {
  let count = 0;

  const traverse = (cols: Array<TableColumn<T>>) => {
    cols.forEach((item: TableColumn<T>) => {
      if (item.columns) {
        traverse(item.columns);
      } else {
        count++;
      }
    });
  };

  traverse(columns);

  return count;
};

export const transformColumns = <T extends TableRow>(
  columns: Array<TableColumn<T>>,
  maxLevel: number,
): Array<TableColumn<T> & { position: Position }>[] => {
  const stack = [{ columns, index: 0 }];
  const headersArr: Array<TableColumn<T> & { position: Position }>[] = [];

  while (stack.length) {
    const level = stack.length - 1;
    const node = stack[level];
    const item: TableColumn<T> = node.columns[node.index];

    if (item) {
      if (!headersArr[level]) headersArr[level] = [];
      const topHeaderGridIndex = stack[0].index;
      const prevItem = headersArr[level][headersArr[level].length - 1];
      const gridIndex = prevItem
        ? prevItem.position.gridIndex + (prevItem.position.colSpan || 1)
        : 0;

      const handledItem: TableColumn<T> & { position: Position } = {
        ...item,
        position: {
          topHeaderGridIndex,
          gridIndex,
          level,
        },
      };

      if (!handledItem.columns) {
        handledItem.position.rowSpan = maxLevel - level;
        headersArr[level].push(handledItem);
        node.index++;
      } else {
        handledItem.position.colSpan = getLastChildrenCount(handledItem.columns);
        headersArr[level].push(handledItem);
        stack.push({ columns: handledItem.columns, index: 0 });
      }
    } else {
      stack.pop();
      if (stack[stack.length - 1]) stack[stack.length - 1].index++;
    }
  }

  return headersArr;
};

/**
 * Возвращает данные, необходимые для построения хидера таблицы
 *
 * @param columns - массив колонок
 *
 * @return {
 *   {Array<Header<T>>[]} headers: двумерный массив заголовков, выстроенный по вертикали;
 *   {Array<Header<T>>} flattenedHeaders: плоский массив заголовков;
 *   {Array<Header<T>>} lowHeaders: самые нижние заголовки (по ним строятся колонки);
 *   {Record<number, HTMLDivElement | null>} headerRowsRefs: содержит рефы на заголовки;
 *   {Array<number>} headerRowsHeights: массив высот строк заголовков;
 *   {Array<number>} headerColumnsHeights: массив высот колонок заголовков;
 *   {Array<number>} resizerTopOffsets: массив отступов для компонентов Resizer;
 * }
 */
export const useHeaderData = <T extends TableRow>(
  columns: Array<TableColumn<T>>,
): HeaderData<T> => {
  const headerRowsRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const headers = transformColumns(columns, getMaxLevel(columns));
  const headerColumnsHeights: Array<number> = Object.values(headerRowsRefs.current)
    .filter(isNotNil)
    .map((ref) => ref.getBoundingClientRect().height);
  const flattenedHeaders = headers
    .flat()
    .filter((column: TableColumn<T>) => !column.hidden)
    .map((column, index) => ({
      ...column,
      position: {
        ...column.position,
        smallTextSize: headers.length > 1 && column.position.level === headers.length - 1,
        height: headerColumnsHeights[index] || 0,
      },
    }));
  const headerRowsHeights = headers.map((arr, index) => {
    return Math.min.apply(
      null,
      flattenedHeaders
        .filter((col: TableColumn<T> & { position: Position }) => col.position.level === index)
        .map((item) => item.position.height),
    );
  });
  const lowHeaders = flattenedHeaders
    .filter(({ position: { colSpan } }: TableColumn<T> & { position: Position }) => !colSpan)
    .sort((a, b) => {
      if (a.position.topHeaderGridIndex !== b.position.topHeaderGridIndex) {
        return a.position.topHeaderGridIndex > b.position.topHeaderGridIndex ? 1 : -1;
      }
      return a.position.gridIndex > b.position.gridIndex ? 1 : -1;
    });

  const resizerTopOffsets = lowHeaders.map(
    (header: TableColumn<T> & { position: Position }, index: number) => {
      const headerHeight = headerRowsHeights.reduce((a: number, b: number) => a + b, 0);
      if ((header.position.rowSpan || 0) >= (lowHeaders[index + 1]?.position.rowSpan || 0)) {
        return headerHeight - (header.position.height || 0);
      }
      return headerHeight - lowHeaders[index + 1]?.position.height! || 0;
    },
  );

  return {
    headers,
    flattenedHeaders,
    lowHeaders,
    headerRowsRefs,
    headerRowsHeights,
    headerColumnsHeights,
    resizerTopOffsets,
  };
};

/**
 * Возвращает 2 функции, необходимые для отображения большого количества строк в таблице
 *
 * @param maxVisibleRows - максимальное количество отображаемых строк в один момент времени
 * @param scrollableEl - элемент, на который вешается scroll listener
 * @param enabled - флаг включения данной функциональность
 *
 * @return {
 *   getSlicedRows: функция, обрезающая исходный массив данных
 *   setBoundaryRef: функция, проставляющая рефы необходимым ячейкам для вычисления границ отображения строк
 * }
 */
export const useLazyLoadData = (
  maxVisibleRows: number,
  scrollableEl: HTMLDivElement | Window | null,
  enabled: boolean,
) => {
  const [visibleStartIndex, setVisibleStartIndex] = React.useState<number>(0);
  const cellsRefStart = React.useRef<HTMLDivElement>(null);
  const cellsRefEnd = React.useRef<HTMLDivElement>(null);
  const additionalRowsCount = Math.floor(maxVisibleRows / 3);

  React.useEffect(() => {
    if (!enabled) return;
    let elHeight = 0;
    if (scrollableEl && 'offsetHeight' in scrollableEl) {
      elHeight = scrollableEl.offsetHeight;
    } else if (scrollableEl && 'outerHeight' in scrollableEl) {
      elHeight = scrollableEl.outerHeight;
    }
    const onScrollListener = () => {
      if (cellsRefEnd.current && elHeight / 2 > cellsRefEnd.current.getBoundingClientRect().top) {
        setVisibleStartIndex((prevIndex) => prevIndex + additionalRowsCount);
      } else if (
        cellsRefStart.current &&
        cellsRefStart.current.getBoundingClientRect().top > elHeight / 2
      ) {
        setVisibleStartIndex((prevIndex) =>
          prevIndex - additionalRowsCount < 0 ? 0 : prevIndex - additionalRowsCount,
        );
      }
    };

    scrollableEl?.addEventListener('scroll', onScrollListener);

    return () => scrollableEl?.removeEventListener('scroll', onScrollListener);
  }, [visibleStartIndex, scrollableEl]);

  const setBoundaryRef = (columnIdx: number, rowIdx: number) => {
    if (enabled && columnIdx === 0 && rowIdx === additionalRowsCount && visibleStartIndex > 0) {
      return cellsRefStart;
    }
    if (enabled && columnIdx === 0 && rowIdx === maxVisibleRows - additionalRowsCount) {
      return cellsRefEnd;
    }
    return undefined;
  };

  const getSlicedRows = <T extends TableRow>(rows: T[]) =>
    !enabled || rows.length < maxVisibleRows
      ? rows
      : rows.slice(visibleStartIndex, visibleStartIndex + maxVisibleRows);

  return {
    getSlicedRows,
    setBoundaryRef,
  };
};

export const transformRows = <T extends TableRow>(
  rows: T[],
  expandedRowIds: string[],
  isTableExpanded?: boolean,
): TableTreeRow<T>[] => {
  const stack = [{ rows, index: 0 }];
  const rowsArr: TableTreeRow<T>[] = [];

  while (stack.length) {
    const level = stack.length - 1;
    const node = stack[level];
    const item: T = node.rows[node.index];

    if (item) {
      const handledItem: TableTreeRow<T> = {
        ...item,
        level,
        rows: item.rows && [...item.rows],
      };

      const needGoDeeper =
        Boolean(handledItem.rows) && (isTableExpanded || expandedRowIds.includes(handledItem.id));

      if (needGoDeeper) {
        stack.push({ rows: handledItem.rows as T[], index: 0 });
      } else {
        node.index++;
      }

      rowsArr.push(handledItem);
    } else {
      stack.pop();
      if (stack[stack.length - 1]) {
        stack[stack.length - 1].index++;
      }
    }
  }
  return rowsArr;
};

export function getMergedArray<TYPE>(mainArr: TYPE[], mergeArr: TYPE[]) {
  const length = Math.max(mainArr.length, mergeArr.length);
  const resultArr: TYPE[] = [];
  for (let i = 0; i < length; i++) {
    resultArr.push(mergeArr[i] ?? mainArr[i]);
  }
  return resultArr;
}
