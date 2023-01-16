import { Example } from '@consta/stand';
import React from 'react';

import { List, ListPropSize } from '##/components/ListCanary';

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

const sizes: ListPropSize[] = ['xs', 's', 'm', 'l'];

export const ListExampleSize = () => {
  return (
    <Example
      col={{ 1: 0, [sizes.length]: 600 }}
      items={sizes}
      getItemDescription={(size) => `size="${size}"`}
      getItemNode={(size) => <List size={size} items={items} />}
    />
  );
};
