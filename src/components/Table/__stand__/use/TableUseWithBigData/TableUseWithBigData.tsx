import '../Table.use.css';

import React from 'react';

import {
  generateData,
  tableData,
} from '##/components/Table/__mock__/data.mock';
import { Table, TableProps, TableRow } from '##/components/Table/Table';
import { cn } from '##/utils/bem';

const cnTableUse = cn('TableUse');

type Item = TableRow & {
  id: string;
  [key: string]: string;
};

export const TableUseWithBigData = () => {
  const params = generateData(5000, 5);

  return (
    <div className={cnTableUse({ fixedSize: true })}>
      <Table
        {...(params as TableProps<Item>)}
        filters={tableData.filters}
        borderBetweenColumns
        borderBetweenRows
        lazyLoad={{ maxVisibleRows: 150 }}
      />
    </div>
  );
};
