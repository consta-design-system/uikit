import { Example } from '@consta/stand';
import React from 'react';

import { cnMixList, List } from '##/components/ListCanary';
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
        <List items={items} size="xs" className={cnMixList({})} />
      </div>
      <div>
        <Text>s</Text>
        <List items={items} size="s" className={cnMixList({})} />
      </div>
      <div>
        <Text>m</Text>
        <List items={items} size="m" className={cnMixList({})} />
      </div>
      <div>
        <Text>l</Text>
        <List items={items} size="l" className={cnMixList({})} />
      </div>
    </Example>
  );
};
