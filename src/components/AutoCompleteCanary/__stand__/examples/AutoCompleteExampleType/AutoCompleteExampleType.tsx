import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { AutoComplete } from '##/components/AutoCompleteCanary';
import { getMailItems } from '##/components/AutoCompleteCanary/__mocks__/data.mock';

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
export const AutoCompleteExampleType = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        type="text"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="textarea"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};

export const AutoCompleteExampleTypeEmail = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        type="email"
        value={value}
        items={getMailItems(value)}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
