import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
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
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Table columns={columns} rows={rows} />
    </StoryBookExample>
  );
}

export function TableExampleBorderBetweenColumns() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Table columns={columns} rows={rows} borderBetweenColumns />
    </StoryBookExample>
  );
}
