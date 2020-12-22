import './TableHeader.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { TableCell } from '../Cell/TableCell';
import { FieldSelectedValues, Filters, getOptionsForFilters, SelectedFilters } from '../filtering';
import { TableFilterTooltip } from '../FilterTooltip/TableFilterTooltip';
import { Header } from '../helpers';
import { ColumnMetaData, TableColumn, TableRow } from '../Table';

const cnTableHeader = cn('TableHeader');

type TableCSSCustomProperty = {
  '--table-header-height': string;
};

export const levelTypes = ['high', 'low', 'default'] as const;
export type LevelType = typeof levelTypes[number];

type Props<T extends TableRow> = {
  isStickyHeader: boolean;
  headersWithMetaData: Array<Header<T> & ColumnMetaData>;
  headerRowsHeights: Array<number>;
  headerRowsRefs: React.MutableRefObject<Record<number, HTMLDivElement | null>>;
  getStickyLeftOffset: (columnIndex: number, topHeaderGridIndex: number) => number | undefined;
  stickyColumnsGrid: number;
  showVerticalCellShadow: boolean;
  getSortIcon: (column: Header<T>) => React.FC;
  handleSortClick: (column: TableColumn<T>) => void;
  handleFilterTogglerClick: (id: string) => () => void;
  handleTooltipSave: (field: string, tooltipSelectedFilters: FieldSelectedValues) => void;
  filters: Filters<T> | undefined;
  visibleFilter: string | null;
  selectedFilters: SelectedFilters;
  showHorizontalCellShadow: boolean;
  borderBetweenColumns: boolean;
};

export const TableHeader = <T extends TableRow>({
  isStickyHeader,
  headersWithMetaData,
  headerRowsHeights,
  headerRowsRefs,
  getStickyLeftOffset,
  stickyColumnsGrid,
  showVerticalCellShadow,
  getSortIcon,
  handleSortClick,
  handleFilterTogglerClick,
  handleTooltipSave,
  filters,
  visibleFilter,
  selectedFilters,
  showHorizontalCellShadow,
  borderBetweenColumns,
}: Props<T>): React.ReactElement => {
  const tableHeaderHeight = headerRowsHeights.reduce((a: number, b: number) => a + b, 0);
  const tableHeaderStyle: React.CSSProperties & TableCSSCustomProperty = {
    '--table-header-height': `${tableHeaderHeight}px`,
  };
  const getLevelType = (column: Header<T> & ColumnMetaData): LevelType => {
    if (Number(column.position!.colSpan) >= 1) return 'high';
    if (column.position?.smallTextSize) return 'low';
    return 'default';
  };
  const isColumnResized = (column: Header<T> & ColumnMetaData): boolean => {
    const headers: Array<Header<T> & ColumnMetaData> = [];
    const build = (header: Header<T> & ColumnMetaData) => {
      if (!header.columns) {
        headers.push(header);
      } else {
        header.columns.forEach((col) =>
          build(
            headersWithMetaData.find((head) => head.title === col.title) as Header<T> &
              ColumnMetaData,
          ),
        );
      }
    };
    build(column);
    return headers.some((header) => header.isResized);
  };
  return (
    <>
      <div className={cnTableHeader('Row', { withVerticalBorder: borderBetweenColumns })}>
        {headersWithMetaData.map((column: Header<T> & ColumnMetaData, columnIdx: number) => {
          const style: React.CSSProperties = {};
          if (column.position!.colSpan) {
            style.gridColumnEnd = `span ${column.position!.colSpan}`;
          }
          if (column.position!.rowSpan) {
            style.gridRowEnd = `span ${column.position!.rowSpan}`;
          }
          if (isStickyHeader) {
            style.top = headerRowsHeights
              .slice(0, column.position!.level)
              .reduce((a: number, b: number) => a + b, 0);
          }
          return (
            <TableCell
              type="header"
              key={columnIdx}
              ref={(ref: HTMLDivElement | null): void => {
                /* eslint-disable-next-line no-param-reassign */
                headerRowsRefs.current[columnIdx] = ref;
              }}
              style={{
                ...style,
                left: getStickyLeftOffset(
                  column.position!.gridIndex,
                  column.position!.topHeaderGridIndex,
                ),
              }}
              isSticky={isStickyHeader}
              isResized={isColumnResized(column)}
              column={column}
              className={cnTableHeader('Cell', {
                isFirstColumn: column.position!.gridIndex === 0,
                isFirstRow: column.position!.level === 0,
                isLastInColumn:
                  column.position?.topHeaderGridIndex !==
                  headersWithMetaData[columnIdx + 1]?.position?.topHeaderGridIndex,
                level: getLevelType(column),
              })}
              showVerticalShadow={
                showVerticalCellShadow &&
                column?.position!.gridIndex! + (column?.position!.colSpan || 1) ===
                  stickyColumnsGrid
              }
            >
              {column.title}
              <div
                className={cnTableHeader('Buttons', {
                  isSortingActive: column.isSortingActive,
                  isFilterActive: column.isFilterActive,
                })}
              >
                {column.sortable && (
                  <Button
                    size="xs"
                    iconSize="s"
                    view="clear"
                    onlyIcon
                    onClick={(): void => handleSortClick(column)}
                    iconLeft={getSortIcon(column)}
                    className={cnTableHeader('Icon', { type: 'sort' })}
                  />
                )}
                {filters && column.filterable && (
                  <TableFilterTooltip
                    field={column.accessor!}
                    isOpened={visibleFilter === column.accessor}
                    options={getOptionsForFilters(filters, column.accessor!)}
                    values={selectedFilters[column.accessor!] || []}
                    onChange={handleTooltipSave}
                    onToggle={handleFilterTogglerClick(column.accessor!)}
                    className={cnTableHeader('Icon', { type: 'filter' })}
                  />
                )}
              </div>
            </TableCell>
          );
        })}
      </div>
      {/*
        Рендерим тень заголовка отдельно чтобы избежать возможных наложений
        теней для ячеек заголовка и ячеек прикрепленных слева.
      */}
      <div className={cnTableHeader('ShadowWrapper')} style={tableHeaderStyle}>
        <div
          className={cnTableHeader('Shadow', { show: showHorizontalCellShadow && isStickyHeader })}
        />
      </div>
    </>
  );
};
