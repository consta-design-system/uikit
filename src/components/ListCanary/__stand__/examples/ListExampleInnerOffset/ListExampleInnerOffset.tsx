import { Example } from '@consta/stand';
import React from 'react';

import { List, ListPropInnerOffset } from '##/components/ListCanary';

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

const innerOffsets: ListPropInnerOffset[] = ['increased', 'normal'];

export const ListExampleInnerOffset = () => {
  return (
    <Example
      col={{ 1: 0, flex: 600 }}
      items={innerOffsets}
      getItemDescription={(innerOffset) => `innerOffset="${innerOffset}"`}
      getItemNode={(innerOffset) => (
        <List items={items} innerOffset={innerOffset} />
      )}
    />
  );
};
