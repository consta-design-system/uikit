import { Example } from '@consta/stand';
import React from 'react';

import { List, ListPropIndent } from '##/components/ListCanary';

type Item = {
  label: string;
  id: number;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
];

const indents: ListPropIndent[] = ['increased', 'normal'];

export const ListExampleIndent = () => {
  return (
    <Example
      col={{ 1: 0, flex: 600 }}
      items={indents}
      getItemDescription={(indent) => `indent="${indent}"`}
      getItemNode={(indent) => <List items={items} indent={indent} />}
    />
  );
};
