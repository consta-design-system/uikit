import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Table, TableColumn } from '../../../Table';

const rows = [
  {
    id: '1',
    name: 'Антон',
  },
  {
    id: '2',
    name: 'Василий',
  },
];

const columns: TableColumn<typeof rows[number]>[] = [
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
    sortable: true,
  },
];

export function TableExampleBasic() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Table columns={columns} rows={rows} />
    </StoryBookExample>
  );
}
