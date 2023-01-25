import { Example } from '@consta/stand';
import React from 'react';

import { List } from '##/components/ListCanary';

type Item = { label: string };

const items: Item[] = [
  {
    label: 'Первый',
  },
  {
    label: 'Второй',
  },
  {
    label: 'Третий',
  },
];

export const ListExampleBasic = () => {
  return (
    <Example>
      <List items={items} />
    </Example>
  );
};
