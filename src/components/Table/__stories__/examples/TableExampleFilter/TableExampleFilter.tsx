import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
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
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Table columns={columns} rows={rows} filters={filters} />
    </StoryBookExample>
  );
}
