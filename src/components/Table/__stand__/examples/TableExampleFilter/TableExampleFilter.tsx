import { Example } from '@consta/stand';
import React from 'react';

import { Table, TableColumn, TableFilters } from '../../../Table';

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

const filters: TableFilters<typeof rows[number]> = [
  {
    id: 'executor',
    name: 'Антон',
    filterer: (value) => value === 'Антон',
    field: 'name',
  },
];

export function TableExampleFilter() {
  return (
    <Example col={1}>
      <Table columns={columns} rows={rows} filters={filters} />
    </Example>
  );
}
