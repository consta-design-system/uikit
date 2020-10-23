import './Table.css';

import React from 'react';

import { useComponentSize } from '../../hooks/useComponentSize/useComponentSize';
import { IconSortDown } from '../../icons/IconSortDown/IconSortDown';
import { IconSortUp } from '../../icons/IconSortUp/IconSortUp';
import { IconUnsort } from '../../icons/IconUnsort/IconUnsort';
import { sortBy, updateAt } from '../../utils/array';
import { cn } from '../../utils/bem';
import { isNotNil } from '../../utils/type-guards';
import { Text } from '../Text/Text';

import { HorizontalAlign, TableCell, VerticalAlign } from './Cell/TableCell';
import { TableHeader } from './Header/TableHeader';
import { TableResizer } from './Resizer/TableResizer';
import { TableSelectedOptionsList } from './SelectedOptionsList/TableSelectedOptionsList';
import {
  fieldFiltersPresent,
  FieldSelectedValues,
  Filters,
  filterTableData,
  getSelectedFiltersList,
  isSelectedFiltersPresent,
  useSelectedFilters,
} from './filtering';
import {
  getColumnLeftOffset,
  getColumnsSize,
  getNewSorting,
  Header,
  Position,
  useHeaderData,
  useLazyLoadData,
} from './helpers';

const cnTable = cn('Table');

export const sizes = ['s', 'm', 'l'] as const;
type Size = typeof sizes[number];

export const zebraStriped = ['odd', 'even'] as const;
type ZebraStriped = typeof zebraStriped[number];

type TableCSSCustomProperty = {
  '--table-width': string;
};

export type LazyLoad =
  | {
      maxVisibleRows?: number;
      scrollableEl?: HTMLDivElement | Window;
    }
  | undefined;

type ActiveRow = {
  id: string | undefined;
  onChange: (id: string | undefined) => void;
};

export type TableRow = {
  [key: string]: React.ReactNode;
  id: string;
};

export type TableFilters<T extends TableRow> = Filters<T>;

export type RowField<T extends TableRow> = Exclude<keyof T, symbol | number>;

export type ColumnWidth = number | undefined;

export type TableColumn<T extends TableRow> = {
  title: React.ReactNode;
  accessor: RowField<T>;
  align?: HorizontalAlign;
  withoutPadding?: boolean;
  width?: ColumnWidth;
} & ({ sortable?: false } | { sortable: true; sortByField?: RowField<T> }) & {
    columns?: Array<TableColumn<T>>;
    position?: Position;
  };

export type ColumnMetaData = {
  filterable: boolean;
  isSortingActive: boolean;
  isFilterActive: boolean;
  isResized: boolean;
  isSticky: boolean;
  showResizer: boolean;
  columnWidth: number;
  columnLeftOffset: number;
};

export type Props<T extends TableRow> = {
  columns: Array<TableColumn<T>>;
  rows: T[];
  filters?: Filters<T>;
  size?: Size;
  stickyHeader?: boolean;
  stickyColumns?: number;
  isResizable?: boolean;
  activeRow?: ActiveRow;
  verticalAlign?: VerticalAlign;
  zebraStriped?: ZebraStriped;
  borderBetweenRows?: boolean;
  borderBetweenColumns?: boolean;
  emptyRowsPlaceholder?: React.ReactNode;
  className?: string;
  onRowHover?: ({ id, event }: { id: string | undefined; event: React.MouseEvent }) => void;
  lazyLoad?: LazyLoad;
};

export type SortingState<T extends TableRow> = {
  by: RowField<T>;
  order: 'asc' | 'desc';
} | null;

const getColumnSortByField = <T extends TableRow>(column: TableColumn<T>): RowField<T> =>
  (column.sortable && column.sortByField) || column.accessor;

const defaultEmptyRowsPlaceholder = (
  <Text as="span" view="primary" size="s" lineHeight="s">
    Нет данных
  </Text>
);

export const Table = <T extends TableRow>({
  columns,
  rows,
  size = 'l',
  filters,
  isResizable = false,
  stickyHeader = false,
  stickyColumns = 0,
  activeRow,
  verticalAlign = 'top',
  zebraStriped,
  borderBetweenRows = false,
  borderBetweenColumns = false,
  emptyRowsPlaceholder = defaultEmptyRowsPlaceholder,
  className,
  onRowHover,
  lazyLoad,
}: Props<T>): React.ReactElement => {
  const {
    headers,
    flattenedHeaders,
    lowHeaders,
    headerRowsRefs,
    headerRowsHeights,
    resizerTopOffsets,
  } = useHeaderData(columns);
  const stickyColumnsGrid =
    headers[0][stickyColumns - 1]?.position.gridIndex +
    (headers[0][stickyColumns - 1]?.position.colSpan || 1);

  const [resizedColumnWidths, setResizedColumnWidths] = React.useState<ColumnWidth[]>(
    lowHeaders.map((column: TableColumn<T>) => column.width),
  );
  const [initialColumnWidths, setInitialColumnWidths] = React.useState<number[]>([]);
  const [sorting, setSorting] = React.useState<SortingState<T>>(null);
  const [visibleFilter, setVisibleFilter] = React.useState<string | null>(null);
  const [tableScroll, setTableScroll] = React.useState({ top: 0, left: 0 });
  const tableRef = React.useRef<HTMLDivElement>(null);
  const columnsRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const {
    selectedFilters,
    updateSelectedFilters,
    removeOneSelectedFilter,
    removeAllSelectedFilters,
  } = useSelectedFilters(filters);
  /*
    Подписываемся на изменения размеров таблицы, но не используем значения из
    хука так как нам нужна ширина и высота таблицы без размера скролла. Этот хук
    использует значения `offsetWidth` и `offsetHeight` которые включают размер
    скролл бара.
  */
  useComponentSize(tableRef);
  const tableHeight = tableRef.current?.clientHeight || 0;
  const tableWidth = tableRef.current?.clientWidth || 0;

  const showVerticalCellShadow = tableScroll.left > 0;
  const showHorizontalCellShadow = tableScroll.top > 0;
  const isRowsClickable = activeRow && activeRow.onChange;

  const updateColumnWidth = (idx: number, newWidth: number): void => {
    setResizedColumnWidths(updateAt(resizedColumnWidths, idx, newWidth));
  };

  React.useLayoutEffect(() => {
    const columnsElements = Object.values(columnsRefs.current).filter(isNotNil);
    if (columnsElements.length === 0 || (resizedColumnWidths.some(isNotNil) && !stickyColumns)) {
      return;
    }

    setInitialColumnWidths(
      columnsElements.map((el) => {
        return el.getBoundingClientRect().width;
      }),
    );
  }, [tableWidth]);

  const isSortedByColumn = (column: TableColumn<T>): boolean =>
    getColumnSortByField(column) === sorting?.by;

  const getSortIcon = (column: TableColumn<T>) => {
    return (
      (isSortedByColumn(column) && (sorting?.order === 'desc' ? IconSortDown : IconSortUp)) ||
      IconUnsort
    );
  };

  const handleSortClick = (column: TableColumn<T>): void => {
    setSorting(getNewSorting(sorting, getColumnSortByField(column)));
  };

  const handleFilterTogglerClick = (id: string) => (): void => {
    setVisibleFilter(visibleFilter === id ? null : id);
  };

  const handleTooltipSave = (field: string, tooltipSelectedFilters: FieldSelectedValues): void => {
    updateSelectedFilters(field, tooltipSelectedFilters);
  };

  const removeSelectedFilter = (tableFilters: Filters<T>) => (filter: string): void => {
    removeOneSelectedFilter(tableFilters, filter);
  };

  const resetSelectedFilters = (): void => {
    if (filters && filters.length) {
      removeAllSelectedFilters(filters);
    }
  };

  const getStickyLeftOffset = (
    columnIndex: number,
    topHeaderGridIndex: number,
  ): number | undefined => {
    if (topHeaderGridIndex >= stickyColumns) {
      return;
    }

    return getColumnLeftOffset({
      columnIndex,
      resizedColumnWidths,
      initialColumnWidths,
    });
  };

  const handleScroll: React.UIEventHandler = (e) => {
    if (!(e.target instanceof HTMLElement) || e.target !== tableRef.current) {
      return;
    }

    setTableScroll({
      top: e.target.scrollTop,
      left: e.target.scrollLeft,
    });
  };

  const handleSelectRow = (id: string): (() => void) | undefined => {
    if (!activeRow || !activeRow.onChange) {
      return;
    }

    return (): void => {
      activeRow.onChange(activeRow.id === id ? undefined : id);
    };
  };

  const handleColumnResize = (idx: number, delta: number): void => {
    const columnMinWidth = Math.min(150, initialColumnWidths[idx]);
    const prevColumnWidth = resizedColumnWidths[idx] || initialColumnWidths[idx];
    const newColumnWidth = Math.max(columnMinWidth, prevColumnWidth + delta);

    updateColumnWidth(idx, newColumnWidth);

    // При расширении последней колонки скроллим таблицу вправо
    const containerEl = tableRef.current;
    if (idx === resizedColumnWidths.length - 1 && delta > 0 && containerEl) {
      containerEl.scrollBy(delta, 0);
    }
  };

  const stickyColumnsWidth = getColumnLeftOffset({
    columnIndex: stickyColumns,
    resizedColumnWidths,
    initialColumnWidths,
  });

  const columnsWithMetaData = (columns: Array<Header<T>>) => {
    return columns.map((column: Header<T>) => {
      const columnIndex = column.position.gridIndex;
      const resizedColumnWidth = resizedColumnWidths[columnIndex];
      const initialColumnWidth = initialColumnWidths[columnIndex];
      const columnWidth = resizedColumnWidth || initialColumnWidth;
      const columnLeftOffset = getColumnLeftOffset({
        columnIndex,
        resizedColumnWidths,
        initialColumnWidths,
      });
      const isResized = !!columnWidth && columnWidth !== initialColumnWidth;
      const isSticky = stickyColumns > column.position!.topHeaderGridIndex;
      const showResizer =
        stickyColumns > columnIndex ||
        stickyColumnsWidth + tableScroll.left < columnLeftOffset + columnWidth;
      const isFilterActive = (selectedFilters[column.accessor] || []).length > 0;

      return {
        ...column,
        filterable: Boolean(filters && fieldFiltersPresent(filters, column.accessor)),
        isSortingActive: isSortedByColumn(column),
        isFilterActive,
        isResized,
        isSticky,
        showResizer,
        columnWidth,
        columnLeftOffset,
      };
    });
  };

  const headersWithMetaData: Array<Header<T> & ColumnMetaData> = columnsWithMetaData(
    flattenedHeaders,
  );

  const tableData = sorting ? sortBy(rows, sorting.by, sorting.order) : rows;
  const filteredData =
    !filters || !isSelectedFiltersPresent(selectedFilters)
      ? tableData
      : filterTableData({ data: tableData, filters, selectedFilters });

  const { maxVisibleRows = 210, scrollableEl = tableRef.current } = lazyLoad || {};

  const { getSlicedRows, setBoundaryRef } = useLazyLoadData(
    maxVisibleRows,
    scrollableEl,
    !!lazyLoad,
  );

  const rowsData = getSlicedRows(filteredData);

  const tableStyle: React.CSSProperties & TableCSSCustomProperty = {
    'gridTemplateColumns': getColumnsSize(resizedColumnWidths),
    '--table-width': `${tableWidth}px`,
  };

  return (
    <div
      ref={tableRef}
      className={cnTable(
        {
          size,
          isResizable,
          zebraStriped,
          withBorderBottom: !filteredData.length,
        },
        [className],
      )}
      style={tableStyle}
      onScroll={handleScroll}
    >
      {/*
        Элементы Resizer рендерятся в отдельных ячейках нулевой высоты с шириной
        равной ширине колонки сетки, при этом у ячейки самый большой z-index в
        таблице чтобы элементы Resizer могли перекрывать ячейки заголовка и
        контента. Кроме того это позволяет зафиксировать вертикальное и
        горизонтальное положение Resizer, а также его высоту.

        Получение высоты Resizer элементов через свойство элемента таблицы
        scrollHeight не подходило, так как в таком случае Resizer растягивал
        таблицу по высоте, поэтому от этого способа отказались.
      */}
      {columnsWithMetaData(lowHeaders).map(
        (column: TableColumn<T> & { showResizer: boolean }, columnIdx: number) => (
          <TableCell
            type="resizer"
            key={columnIdx}
            ref={(ref: HTMLDivElement | null): void => {
              columnsRefs.current[columnIdx] = ref;
            }}
            style={{
              left: getStickyLeftOffset(columnIdx, columnIdx),
            }}
            column={column}
            showVerticalShadow={showVerticalCellShadow}
          >
            {isResizable && (
              <TableResizer
                height={tableHeight - resizerTopOffsets[columnIdx]}
                top={resizerTopOffsets[columnIdx]}
                isVisible={column.showResizer}
                onResize={(delta): void => handleColumnResize(columnIdx, delta)}
                onDoubleClick={(): void =>
                  updateColumnWidth(columnIdx, initialColumnWidths[columnIdx])
                }
              />
            )}
          </TableCell>
        ),
      )}
      <TableHeader
        isStickyHeader={stickyHeader}
        headersWithMetaData={headersWithMetaData}
        headerRowsHeights={headerRowsHeights}
        headerRowsRefs={headerRowsRefs}
        getStickyLeftOffset={getStickyLeftOffset}
        stickyColumnsGrid={stickyColumnsGrid}
        showVerticalCellShadow={showVerticalCellShadow}
        getSortIcon={getSortIcon}
        handleSortClick={handleSortClick}
        handleFilterTogglerClick={handleFilterTogglerClick}
        handleTooltipSave={handleTooltipSave}
        filters={filters}
        visibleFilter={visibleFilter}
        selectedFilters={selectedFilters}
        showHorizontalCellShadow={showHorizontalCellShadow}
        borderBetweenColumns={borderBetweenColumns}
      />
      {filters && isSelectedFiltersPresent(selectedFilters) && (
        <div className={cnTable('RowWithoutCells')}>
          <TableSelectedOptionsList
            values={getSelectedFiltersList({ filters, selectedFilters, columns: lowHeaders })}
            onRemove={removeSelectedFilter(filters)}
            onReset={resetSelectedFilters}
          />
        </div>
      )}
      {rowsData.length > 0 ? (
        rowsData.map((row, rowIdx) => {
          const nth = (rowIdx + 1) % 2 === 0 ? 'even' : 'odd';
          return (
            <div
              key={row.id}
              className={cnTable('CellsRow', { nth })}
              onMouseEnter={(event) => onRowHover && onRowHover({ id: row.id, event })}
              onMouseLeave={(event) => onRowHover && onRowHover({ id: undefined, event })}
            >
              {columnsWithMetaData(lowHeaders).map((column: TableColumn<T>, columnIdx: number) => {
                return (
                  <TableCell
                    type="content"
                    key={column.accessor}
                    ref={setBoundaryRef(columnIdx, rowIdx)}
                    style={{
                      left: getStickyLeftOffset(columnIdx, column.position!.topHeaderGridIndex),
                    }}
                    wrapperClassName={cnTable('ContentCell', {
                      isActive: activeRow ? activeRow.id === row.id : false,
                      isDarkned: activeRow
                        ? activeRow.id !== undefined && activeRow.id !== row.id
                        : false,
                    })}
                    onClick={handleSelectRow(row.id)}
                    column={column}
                    verticalAlign={verticalAlign}
                    isClickable={!!isRowsClickable}
                    showVerticalShadow={
                      showVerticalCellShadow &&
                      column?.position!.gridIndex + (column?.position!.colSpan || 1) ===
                        stickyColumnsGrid
                    }
                    isBorderTop={rowIdx > 0 && borderBetweenRows}
                    isBorderLeft={columnIdx > 0 && borderBetweenColumns}
                  >
                    {row[column.accessor]}
                  </TableCell>
                );
              })}
            </div>
          );
        })
      ) : (
        <div className={cnTable('RowWithoutCells')}>
          <div className={cnTable('EmptyCell')}>{emptyRowsPlaceholder}</div>
        </div>
      )}
    </div>
  );
};
