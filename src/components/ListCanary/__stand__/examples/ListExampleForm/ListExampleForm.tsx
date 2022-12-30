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

export const ListExampleForm = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <div>
        <Text>default</Text>
        <List items={items} form="default" className={cnMixList({})} />
      </div>
      <div>
        <Text>round</Text>
        <List items={items} form="round" className={cnMixList({})} />
      </div>
      <div>
        <Text>brick</Text>
        <List items={items} form="brick" className={cnMixList({})} />
      </div>
    </Example>
  );
};
