import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { FlatSelect } from '../../..';

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

const itemsEmpty: Item[] = [];

export const FlatSelectExampleLoading = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={{ 1: 0, 2: 760 }}>
      <FlatSelect
        items={items}
        value={value}
        onChange={setValue}
        isLoading
        bordered
      />
      <FlatSelect
        items={itemsEmpty}
        value={value}
        onChange={setValue}
        isLoading
        bordered
      />
    </Example>
  );
};
