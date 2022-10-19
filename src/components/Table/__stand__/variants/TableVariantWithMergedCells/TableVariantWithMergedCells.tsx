import React from 'react';

import { tableWithMergedCellsData } from '##/components/Table/__mock__/data.mock';
import { Table, TableProps, TableRow } from '##/components/Table/Table';

import { useVariants } from '../useVariants/useVariants';

export const TableVariantWithMergedCells = () => {
  const props = useVariants({
    ...(tableWithMergedCellsData as Partial<TableProps<TableRow>>),
    borderBetweenColumns: true,
    borderBetweenRows: true,
  });
  return <Table {...props} />;
};
