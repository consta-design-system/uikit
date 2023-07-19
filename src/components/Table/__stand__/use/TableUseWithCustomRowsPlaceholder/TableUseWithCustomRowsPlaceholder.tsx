import '../Table.use.css';

import React from 'react';

import { tableData } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';
import { Text } from '##/components/Text/Text';
import { cn } from '##/utils/bem';

const cnTableUse = cn('TableUse');

export const TableUseWithCustomRowsPlaceholder = () => {
  return (
    <div className={cnTableUse()}>
      <Table
        columns={tableData.columns}
        filters={tableData.filters}
        rows={[]}
        borderBetweenColumns
        borderBetweenRows
        emptyRowsPlaceholder={<Text>Данные не найдены</Text>}
      />
    </div>
  );
};
