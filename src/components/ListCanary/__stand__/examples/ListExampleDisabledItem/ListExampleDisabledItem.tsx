import { Example } from '@consta/stand';
import React from 'react';

import { List } from '##/components/ListCanary';

type Item = {
  label: string;
  id: number;
  disabled: boolean;
};

const items: Item[] = [
  {
    label: 'Первый — этот вариант не выбрать',
    id: 1,
    disabled: true,
  },
  {
    label: 'Второй',
    id: 2,
    disabled: false,
  },
  {
    label: 'Третий — и этот тоже не выбрать',
    id: 3,
    disabled: true,
  },
];

export const ListExampleDisabledItem = () => {
  return (
    <Example>
      <List items={items} />
    </Example>
  );
};
