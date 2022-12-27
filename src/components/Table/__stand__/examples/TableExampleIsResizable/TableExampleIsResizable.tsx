import { Example } from '@consta/stand';
import React from 'react';

import { Table, TableColumn } from '../../../Table';

const rows = [
  { id: '1', name: 'Антон' },
  { id: '2', name: 'Василий' },
];

const columns: TableColumn<typeof rows[number]>[] = [
  {
    title: '№',
    accessor: 'id',
  },
  {
    title: 'Имя',
    accessor: 'name',
  },
];

export function TableExampleIsResizable() {
  return (
    <Example col={1}>
      <Table columns={columns} rows={rows} isResizable />
    </Example>
  );
}
