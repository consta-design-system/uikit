import { ColumnWidth, RowField, SortingState, TableRow } from './Table';

export const getColumnsSize = (sizes: ColumnWidth[]): string => {
  return sizes.map((s) => (s ? `${s}px` : 'minmax(min-content, 1fr)')).join(' ');
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

export const getNewSorting = <T extends TableRow>(
  currentSorting: SortingState<T>,
  newField: RowField<T>,
): SortingState<T> => {
  if (!currentSorting || currentSorting.by !== newField) {
    return {
      by: newField,
      order: 'asc',
    };
  }

  if (currentSorting.order === 'asc') {
    return {
      by: newField,
      order: 'desc',
    };
  }

  return null;
};
