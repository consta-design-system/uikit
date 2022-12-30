import { Example } from '@consta/stand';
import React from 'react';

import { cnMixList, List } from '##/components/ListCanary';

type Item = { id: number; label: string };
const items: Item[] = [
  {
    id: 1,
    label: 'Первый',
  },
  {
    id: 2,
    label: 'Второй',
  },
  {
    id: 3,
    label: 'Третий',
  },
];
export const ListExampleBasic = () => {
  return (
    <Example>
      <List items={items} className={cnMixList({})} />
    </Example>
  );
};
