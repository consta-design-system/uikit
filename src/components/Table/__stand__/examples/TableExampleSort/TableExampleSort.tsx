import { Example } from '@consta/stand';
import React from 'react';

import { Table, TableColumn } from '../../../Table';

export function TableExampleSort() {
  const rows = [
    { id: '1', letter: 'А' },
    { id: '2', letter: 'Б' },
    { id: '3', letter: 'В' },
  ];

  const columns: TableColumn<typeof rows[number]>[] = [
    {
      title: '№',
      accessor: 'id',
      width: 100,
      sortable: true,
    },
    {
      title: 'Буква',
      accessor: 'letter',
      sortable: true,
      order: 'desc',
    },
  ];

  return (
    <Example col={1}>
      <Table columns={columns} rows={rows} />
    </Example>
  );
}
