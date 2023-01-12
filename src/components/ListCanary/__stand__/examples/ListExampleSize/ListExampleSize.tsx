import { Example } from '@consta/stand';
import React from 'react';

import { List } from '##/components/ListCanary';
import { Text } from '##/components/Text';

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

export const ListExampleSize = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <div>
        <Text>xs</Text>
        <List items={items} size="xs" />
      </div>
      <div>
        <Text>s</Text>
        <List items={items} size="s" />
      </div>
      <div>
        <Text>m</Text>
        <List items={items} size="m" />
      </div>
      <div>
        <Text>l</Text>
        <List items={items} size="l" />
      </div>
    </Example>
  );
};
