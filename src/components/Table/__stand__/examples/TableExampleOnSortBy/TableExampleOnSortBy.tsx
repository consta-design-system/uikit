import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { SortByProps, Table, TableColumn } from '../../../Table';

type Row = {
  id: string;
  date: string;
};

const data = [
  {
    id: '1',
    date: new Date('Thu Dec 03 2020 14:23:13 GMT+0300 (Moscow Standard Time)'),
  },
  {
    id: '2',
    date: new Date('Thu Dec 03 2020 14:04:13 GMT+0300 (Moscow Standard Time)'),
  },
  {
    id: '3',
    date: new Date('Thu Dec 03 2020 14:55:13 GMT+0300 (Moscow Standard Time)'),
  },
  {
    id: '4',
    date: new Date('Thu Dec 03 2020 14:12:13 GMT+0300 (Moscow Standard Time)'),
  },
];

const columns: TableColumn<Row>[] = [
  {
    title: `Id`,
    accessor: 'id',
    sortable: true,
  },
  {
    title: `Дата`,
    accessor: `date`,
    sortable: true,
  },
];

export function TableExampleOnSortBy() {
  const [sortSetting, setSortSetting] = useState<SortByProps<Row> | null>(null);

  const rows = data
    .sort((a, b) => {
      if (sortSetting?.sortingBy === 'date') {
        const [firstDate, secondDate] =
          sortSetting.sortOrder === 'asc' ? [a.date, b.date] : [b.date, a.date];
        return firstDate.valueOf() - secondDate.valueOf();
      }
      return 0;
    })
    .map((item) => ({
      id: item.id.valueOf(),
      date: item.date.toString(),
    }));

  return (
    <Example col={1}>
      <Table rows={rows} columns={columns} onSortBy={setSortSetting} />
    </Example>
  );
}
