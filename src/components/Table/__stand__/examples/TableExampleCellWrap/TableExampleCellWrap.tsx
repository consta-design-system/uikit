import { Example } from '@consta/stand';
import React from 'react';

import { Table, TableColumn } from '../../../Table';

const rows = [
  {
    id: 'Ссылка',
    name: 'https://uikit.consta.design/',
  },
  {
    id: 'Описание',
    name: 'Это просто длинный текст. Он нужен, чтобы посмотреть, как работают переносы разного типа. Вот на всякий случай — ещё одно предложение. И ещё одно, чтобы тексты отличались по длине.',
  },
  {
    id: 'Длинная строка',
    name: 'аааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааа',
  },
];

const columns: TableColumn<typeof rows[number]>[] = [
  {
    title: 'Что',
    accessor: 'id',
    align: 'left',
    // width: 300,
  },
  {
    title: 'Текст',
    accessor: 'name',
    align: 'left',
    width: 300,
  },
];

export function TableExampleCellWrap() {
  return (
    <Example col={1}>
      <Table
        columns={columns}
        rows={rows}
        borderBetweenRows
        borderBetweenColumns
      />
      <Table
        columns={columns}
        rows={rows}
        borderBetweenRows
        borderBetweenColumns
        getCellWrap={() => 'truncate'}
      />
      <Table
        columns={columns}
        rows={rows}
        borderBetweenRows
        borderBetweenColumns
        getCellWrap={() => 'break'}
      />
    </Example>
  );
}
