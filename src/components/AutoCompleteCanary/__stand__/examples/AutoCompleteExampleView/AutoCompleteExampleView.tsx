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
export const AutoCompleteExampleView = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={{ 1: 0, 2: 600 }}>
      <AutoComplete
        type="text"
        value={value}
        view="default"
        items={items}
        onChange={setValue}
      />
      <AutoComplete
        type="text"
        value={value}
        items={items}
        view="clear"
        onChange={setValue}
      />
    </Example>
  );
};
