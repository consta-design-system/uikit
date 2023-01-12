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
    width: 100,
    sortable: true,
  },
  {
    title: 'Имя',
    accessor: 'name',
    sortable: true,
  },
];

export function TableExampleBorderBetweenRows() {
  return (
    <Example col={1}>
      <Table columns={columns} rows={rows} borderBetweenRows />
    </Example>
  );
}

export function TableExampleBorderBetweenColumns() {
  return (
    <Example col={1}>
      <Table columns={columns} rows={rows} borderBetweenColumns />
    </Example>
  );
}
