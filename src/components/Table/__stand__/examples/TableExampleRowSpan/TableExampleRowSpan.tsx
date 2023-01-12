import { Example } from '@consta/stand';
import React from 'react';

import { withColSpan } from '##/components/Table/__mock__/data.mock';

import { Table } from '../../../Table';

export const TableExampleRowSpan = () => {
  return (
    <Example col={1}>
      <Table {...withColSpan} borderBetweenRows borderBetweenColumns />
    </Example>
  );
};
