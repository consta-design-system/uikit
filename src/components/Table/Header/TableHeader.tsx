import './TableHeader.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { TableCell } from '../Cell/TableCell';
import {
  FieldSelectedValues,
  Filters,
  getOptionsForFilters,
  SelectedFilters,
} from '../filtering';
import { TableFilterTooltip } from '../FilterTooltip/TableFilterTooltip';
import { Header } from '../helpers';
import {
  ColumnMetaData,
  HeaderVerticalAlign,
  onCellClick,
  TableColumn,
  TableRow,
} from '../Table';

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
  getStickyLeftOffset: (
    columnIndex: number,
    topHeaderGridIndex: number,
  ) => number | undefined;
  stickyColumnsGrid: number;
  showVerticalCellShadow: boolean;
  headerVerticalAlign: HeaderVerticalAlign;
  getSortIcon: (column: Header<T>) => React.FC;
  handleSortClick: (column: TableColumn<T>) => void;
  handleFilterTogglerClick: (id: string) => () => void;
  handleCellClick: onCellClick;
  handleTooltipSave: (
    field: string,
    tooltipSelectedFilters: FieldSelectedValues,
    value?: unknown,
  ) => void;
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
  headerVerticalAlign,
  getSortIcon,
  handleSortClick,
  handleFilterTogglerClick,
  handleCellClick,
  handleTooltipSave,
  filters,
  visibleFilter,
  selectedFilters,
  showHorizontalCellShadow,
  borderBetweenColumns,
}: Props<T>): React.ReactElement => {
  const tableHeaderHeight = headerRowsHeights.reduce(
    (a: number, b: number) => a + b,
    0,
  );
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
            headersWithMetaData.find(
              (head) => head.title === col.title,
            ) as Header<T> & ColumnMetaData,
          ),
        );
      }
    };
    build(column);
    return headers.some((header) => header.isResized);
  };

  const getFilterPopover = (
    column: Header<T> & ColumnMetaData,
  ): React.ReactNode => {
    if (!filters || !column.accessor) {
      return null;
    }
    const curFilter = filters.find(({ field }) => field === column.accessor);
    const FilterComponent = curFilter?.component?.name;
    const filterComponentProps = curFilter?.component?.props ?? {};
    const onToggle = handleFilterTogglerClick(column.accessor);
    const filterId = curFilter?.id;
    const handleFilterSave = (filterValue?: unknown) => {
      if (filterId) {
        handleTooltipSave(column.accessor!, [filterId], filterValue);
      }
      onToggle();
    };

    return column.filterable ? (
      <TableFilterTooltip
        field={column.accessor}
        isOpened={visibleFilter === column.accessor}
        options={getOptionsForFilters(filters, column.accessor)}
        values={selectedFilters[column.accessor].selected || []}
        onChange={handleTooltipSave}
        onToggle={handleFilterTogglerClick(column.accessor)}
        className={cnTableHeader('Icon', { type: 'filter' })}
      >
        {FilterComponent && (
          <FilterComponent
            {...filterComponentProps}
            onConfirm={handleFilterSave}
            filterValue={selectedFilters[column.accessor]?.value}
            onCancel={handleFilterTogglerClick(column.accessor)}
          />
        )}
      </TableFilterTooltip>
    ) : null;
  };

  const control = (column: Header<T> & ColumnMetaData): React.ReactNode => {
    if (column.control) {
      return (
        <div className={cnTableHeader('Сontrol')}>
          {column.control({ column })}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div
        className={cnTableHeader('Row', {
          withVerticalBorder: borderBetweenColumns,
        })}
      >
        {headersWithMetaData.map(
          (column: Header<T> & ColumnMetaData, columnIdx: number) => {
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
                verticalAlign={headerVerticalAlign}
                onContextMenu={(e: React.SyntheticEvent) =>
                  handleCellClick({
                    e,
                    type: 'contextMenu',
                    columnIdx,
                    ref: { current: headerRowsRefs.current[columnIdx] },
                  })
                }
                onClick={(e: React.SyntheticEvent) =>
                  handleCellClick({
                    e,
                    type: 'click',
                    columnIdx,
                    ref: { current: headerRowsRefs.current[columnIdx] },
                  })
                }
                className={cnTableHeader('Cell', {
                  isFirstColumn: column.position?.isFirst,
                  isFirstRow: column.position!.level === 0,
                  isLastInColumn:
                    column.position?.topHeaderGridIndex !==
                    headersWithMetaData[columnIdx + 1]?.position
                      ?.topHeaderGridIndex,
                  level: getLevelType(column),
                })}
                showVerticalShadow={
                  showVerticalCellShadow &&
                  column.position!.gridIndex! +
                    (column?.position!.colSpan || 1) ===
                    stickyColumnsGrid
                }
              >
                {column.title}

                <div
                  className={cnTableHeader('Buttons', {
                    isSortingActive: column.isSortingActive,
                    isFilterActive: column.isFilterActive,
                    verticalAlign: headerVerticalAlign,
                  })}
                >
                  {column.sortable && (
                    <Button
                      type="button"
                      size="xs"
                      iconSize="s"
                      view="clear"
                      onlyIcon
                      onClick={(): void => handleSortClick(column)}
                      iconLeft={getSortIcon(column)}
                      className={cnTableHeader('Icon', { type: 'sort' })}
                    />
                  )}

                  {getFilterPopover(column)}

                  {control(column)}
                </div>
              </TableCell>
            );
          },
        )}
      </div>
      {/*
        Рендерим тень заголовка отдельно чтобы избежать возможных наложений
        теней для ячеек заголовка и ячеек прикрепленных слева.
      */}
      <div className={cnTableHeader('ShadowWrapper')} style={tableHeaderStyle}>
        <div
          className={cnTableHeader('Shadow', {
            show: showHorizontalCellShadow && isStickyHeader,
          })}
        />
      </div>
    </>
  );
};
