import { Example } from '@consta/stand';
import React from 'react';

import { List } from '##/components/ListCanary';

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
export const ListExampleLoading = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <List items={items} isLoading />
      <List items={[] as Item[]} isLoading />
    </Example>
  );
};
