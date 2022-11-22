import React from 'react';

import { withColSpan } from '##/components/Table/__mock__/data.mock';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Table } from '../../../Table';

export const TableExampleRowSpan = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Table {...withColSpan} borderBetweenRows borderBetweenColumns />
    </StoryBookExample>
  );
};
