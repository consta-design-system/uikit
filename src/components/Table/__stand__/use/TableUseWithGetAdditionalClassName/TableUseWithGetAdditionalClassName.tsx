import '../Table.use.css';

import React from 'react';

import {
  tableData,
  tableDataWithAdditionalClassName,
} from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';
import { cn } from '##/utils/bem';

const cnTableUse = cn('TableUse');

export const TableUseWithGetAdditionalClassName = () => {
  return (
    <div className={cnTableUse()}>
      <Table
        {...tableDataWithAdditionalClassName}
        borderBetweenColumns
        borderBetweenRows
        filters={tableData.filters}
      />
    </div>
  );
};
