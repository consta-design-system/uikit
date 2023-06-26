import '../Table.use.css';

import React from 'react';

import {
  customFilters,
  tableData,
} from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';
import { cn } from '##/utils/bem';

const cnTableUse = cn('TableUse');

export const TableUseWithCustomFilters = () => {
  return (
    <div className={cnTableUse()}>
      <Table
        columns={tableData.columns}
        rows={tableData.rows}
        filters={customFilters}
        borderBetweenColumns
        borderBetweenRows
      />
    </div>
  );
};
