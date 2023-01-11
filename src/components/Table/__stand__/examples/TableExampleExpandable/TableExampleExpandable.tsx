import { Example } from '@consta/stand';
import React from 'react';

import { Table, TableColumn, TableRow } from '../../../Table';

type Row = TableRow & {
  field: string;
  year: number;
  type: string;
  rows?: Row[];
};

const columns: TableColumn<Row>[] = [
  {
    title: 'Месторождение',
    accessor: 'field',
    align: 'left',
    sortable: true,
  },
  {
    title: 'Год открытия',
    accessor: 'year',
    align: 'center',
    sortable: true,
  },
  {
    title: 'Тип',
    accessor: 'type',
    align: 'left',
  },
];

const expandableRowsData: Row[] = [
  {
    id: 'row1',
    field: 'Северное',
    year: 1982,
    type: 'Нефть',
    rows: [
      {
        id: 'row1.1',
        field: 'Северо-Западное',
        year: 1985,
        type: 'Конденсат',
      },
      {
        id: 'row1.2',
        field: 'Северо-Восточное',
        year: 1983,
        type: 'Конденсат',
      },
    ],
  },
  {
    id: 'row2',
    field: 'Восточное',
    year: 1989,
    type: 'Конденсат',
    rows: [
      {
        id: 'row2.1',
        field: 'Восточное-1',
        year: 1989,
        type: 'Конденсат',
      },
      {
        id: 'row2.2',
        field: 'Восточное-2',
        year: 1989,
        type: 'Конденсат',
        rows: [
          {
            id: 'row2.2.1',
            field: 'Восточное-3',
            year: 1989,
            type: 'Конденсат',
            rows: [
              {
                id: 'row2.2.1.1',
                field: 'Восточное-8',
                year: 1989,
                type: 'Конденсат',
              },
              {
                id: 'row2.2.1.2',
                field: 'Восточное-7',
                year: 1993,
                type: 'Нефть',
              },
            ],
          },
          {
            id: 'row2.2.2',
            field: 'Восточное-4',
            year: 2001,
            type: 'Нефть',
          },
        ],
      },
    ],
  },
];

export const TableExampleExpandable = () => {
  return (
    <Example col={1}>
      <Table
        columns={columns}
        rows={expandableRowsData}
        borderBetweenColumns
        borderBetweenRows
        isResizable={false}
        stickyColumns={0}
        headerVerticalAlign="center"
        verticalAlign="top"
      />
    </Example>
  );
};
