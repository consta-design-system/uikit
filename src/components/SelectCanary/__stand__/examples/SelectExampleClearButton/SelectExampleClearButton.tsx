import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Select } from '../../..';

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

export const SelectExampleClearButton = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Select
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onChange={setValue}
        clearButton
      />
    </Example>
  );
};
