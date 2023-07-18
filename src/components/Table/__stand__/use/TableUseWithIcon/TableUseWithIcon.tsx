import '../Table.use.css';

import React from 'react';

import { withControlTableMock } from '##/components/Table/__mock__/data.mock';
import { Table } from '##/components/Table/Table';
import { cn } from '##/utils/bem';

const cnTableUse = cn('TableUse');

export const TableUseWithIcon = () => {
  return (
    <div className={cnTableUse()}>
      <Table {...withControlTableMock} borderBetweenColumns borderBetweenRows />
    </div>
  );
};
