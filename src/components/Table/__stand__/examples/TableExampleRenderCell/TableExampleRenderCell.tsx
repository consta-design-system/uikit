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
    renderCell: (row) => <h1>{row.name}</h1>,
  },
];

export function TableExampleRenderCell() {
  return (
    <Example col={1}>
      <Table columns={columns} rows={rows} />
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
