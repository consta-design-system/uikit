import { Example } from '@consta/stand';
import React from 'react';

import { List, ListPropSize } from '##/components/ListCanary';

type Item = {
  label: string;
};

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

const sizes: ListPropSize[] = ['xs', 's', 'm', 'l'];

export const ListExampleSize = () => {
  return (
    <Example
      col={{ 1: 0, [sizes.length]: 600 }}
      items={sizes}
      getItemDescription={(size) => `size="${size}"`}
      getItemNode={(size) => (
        <List
          size={size}
          items={items}
          onItemClick={(item) => alert(item.label)}
        />
      )}
    />
  );
};
