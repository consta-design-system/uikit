import '../Table.use.css';

import React from 'react';

import { tableData } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';
import { cn } from '##/utils/bem';

const cnTableUse = cn('TableUse');

export const TableUseWithStickyHeader = () => {
  return (
    <div className={cnTableUse({ fixedSize: true })}>
      <Table
        {...tableData}
        borderBetweenColumns
        borderBetweenRows
        stickyHeader
      />
    </div>
  );
};
