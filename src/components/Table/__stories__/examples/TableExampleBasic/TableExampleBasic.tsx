import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Table } from '../../../Table';

const columns = [
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

export function TableExampleBasic() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Table columns={columns} rows={rows} />
    </StoryBookExample>
  );
}
