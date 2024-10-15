import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { AutoComplete } from '../../..';

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

export const AutoCompleteExamplePlaceholder = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        type="text"
        placeholder="Введите значение"
        value={value}
        items={items}
        onChange={setValue}
      />
    </Example>
  );
};
