import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { AutoComplete } from '##/components/AutoCompleteCanary';

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

export const AutoCompleteExampleSize = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={{ 1: 0, 4: 880 }}>
      <AutoComplete
        type="text"
        placeholder="Размер xs"
        size="xs"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
        width="full"
      />
      <AutoComplete
        type="text"
        placeholder="Размер s"
        value={value}
        items={items}
        size="s"
        onChange={({ value }) => setValue(value)}
        width="full"
      />
      <AutoComplete
        type="text"
        placeholder="Размер m"
        value={value}
        items={items}
        size="m"
        onChange={({ value }) => setValue(value)}
        width="full"
      />
      <AutoComplete
        type="text"
        placeholder="Размер l"
        value={value}
        items={items}
        size="l"
        onChange={({ value }) => setValue(value)}
        width="full"
      />
    </Example>
  );
};
