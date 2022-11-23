import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';

import { verticalAligns } from '##/components/Table/Cell/TableCell';

import { tableData } from '../../../__mock__/data.mock';
import {
  headerVerticalAligns,
  sizes,
  TableProps,
  TableRow,
  zebraStriped,
} from '../../../Table';

const defaultProps: TableProps<typeof tableData.rows[number]> = {
  columns: tableData.columns,
  rows: tableData.rows,
  filters: tableData.filters,
  borderBetweenColumns: true,
  borderBetweenRows: true,
  isResizable: false,
  stickyColumns: 0,
  stickyHeader: false,
  verticalAlign: 'top',
  zebraStriped: undefined,
  headerVerticalAlign: 'center',
  getAdditionalClassName: undefined,
};

export const useVariants = <T extends TableRow>(
  replacedProps?: Partial<TableProps<T>>,
): TableProps<T> => {
  const props = { ...defaultProps, ...replacedProps } as TableProps<T>;

  const zebraStripedProp = useSelect('zebraStriped', zebraStriped);
  const size = useSelect('size', sizes, 'l');
  const isFilterable = useBoolean('с фильтрами', true);
  const borderBetweenColumns = useBoolean(
    'borderBetweenColumns',
    props.borderBetweenColumns,
  );
  const borderBetweenRows = useBoolean(
    'borderBetweenRows',
    props.borderBetweenRows,
  );
  const isResizable = useBoolean('isResizable', props.isResizable);
  const stickyColumns = useNumber('stickyColumns', props.stickyColumns);
  const stickyHeader = useBoolean('stickyHeader', props.stickyHeader);
  const emptyRowsPlaceholder = useText('emptyRowsPlaceholder', '');
  const verticalAlign = useSelect(
    'verticalAlign',
    verticalAligns,
    props.verticalAlign,
  );
  const headerVerticalAlign = useSelect(
    'headerVerticalAlign',
    headerVerticalAligns,
    props.headerVerticalAlign,
  );
  return {
    columns: props.columns,
    rows: props.rows,
    filters: isFilterable ? props.filters : undefined,
    zebraStriped: zebraStripedProp,
    size,
    borderBetweenColumns,
    borderBetweenRows,
    isResizable,
    stickyColumns,
    stickyHeader,
    emptyRowsPlaceholder,
    verticalAlign,
    headerVerticalAlign,
    onRowCreate: undefined,
    rowCreateText: undefined,
    getTagLabel: props.getTagLabel,
  };
};
