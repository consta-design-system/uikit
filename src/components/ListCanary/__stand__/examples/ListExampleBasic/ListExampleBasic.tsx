import React, { useState } from 'react';

import { List } from '##/components/ListCanary/ListCanary';

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
  const [value, setValue] = useState<Item | null>(null);
  return (
    <List
      items={items}
      value={value}
      onChange={({ value }) => setValue(value)}
    />
  );
};
