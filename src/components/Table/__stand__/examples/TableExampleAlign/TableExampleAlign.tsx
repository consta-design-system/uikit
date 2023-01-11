import { Example } from '@consta/stand';
import React from 'react';

import { Table, TableColumn } from '../../../Table';

const rows = [
  { id: '1', name: 'Антон, который построил дом' },
  { id: '2', name: 'Василий, которого не спросили' },
];

const rowsProf = [
  { id: '1', name: 'Антон, который построил дом', profession: 'строитель' },
  {
    id: '2',
    name: 'Василий, которого не спросили',
    profession: 'отвечает на вопросы',
  },
];

const columns: TableColumn<typeof rowsProf[number]>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'center',
    width: 100,
    sortable: true,
  },
  {
    title: 'Имя',
    accessor: 'name',
    width: 100,
    sortable: true,
  },
  {
    title: 'Профессия',
    accessor: 'profession',
    sortable: true,
  },
];

const columnsAlignLeft: TableColumn<typeof rows[number]>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'left',
  },
  {
    title: 'Имя',
    accessor: 'name',
    align: 'left',
  },
];

const columnsAlignCenter: TableColumn<typeof rows[number]>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'center',
  },
  {
    title: 'Имя',
    accessor: 'name',
    align: 'center',
  },
];

const columnsAlignRight: TableColumn<typeof rows[number]>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'right',
  },
  {
    title: 'Имя',
    accessor: 'name',
    align: 'right',
  },
];

export function TableExampleVerticalAlign() {
  return (
    <Example col={1}>
      <Table
        columns={columns}
        rows={rowsProf}
        verticalAlign="top"
        borderBetweenRows
        borderBetweenColumns
      />
      <Table
        columns={columns}
        rows={rowsProf}
        verticalAlign="center"
        borderBetweenRows
        borderBetweenColumns
      />
      <Table
        columns={columns}
        rows={rowsProf}
        verticalAlign="bottom"
        borderBetweenRows
        borderBetweenColumns
      />
    </Example>
  );
}

export function TableExampleAlignLeft() {
  return (
    <Example col={1}>
      <Table
        columns={columnsAlignLeft}
        rows={rows}
        verticalAlign="top"
        borderBetweenRows
        borderBetweenColumns
      />
    </Example>
  );
}

export function TableExampleAlignCenter() {
  return (
    <Example col={1}>
      <Table
        columns={columnsAlignCenter}
        rows={rows}
        verticalAlign="top"
        borderBetweenRows
        borderBetweenColumns
      />
    </Example>
  );
}

export function TableExampleAlignRight() {
  return (
    <Example col={1}>
      <Table
        columns={columnsAlignRight}
        rows={rows}
        verticalAlign="top"
        borderBetweenRows
        borderBetweenColumns
      />
    </Example>
  );
}
