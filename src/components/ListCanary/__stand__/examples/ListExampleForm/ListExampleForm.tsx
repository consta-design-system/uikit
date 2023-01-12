import { Example } from '@consta/stand';
import React from 'react';

import { List, ListPropForm } from '##/components/ListCanary';

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

const forms: ListPropForm[] = ['default', 'round', 'brick'];
export const ListExampleForm = () => {
  return (
    <Example
      col={{ 1: 0, flex: 600 }}
      items={forms}
      getItemDescription={(form) => `form="${form}"`}
      getItemNode={(form) => <List items={items} form={form} />}
    />
  );
};
