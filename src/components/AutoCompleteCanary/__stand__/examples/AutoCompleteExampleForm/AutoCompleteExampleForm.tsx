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

export const AutoCompleteExampleForm = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        type="text"
        placeholder="Форма round"
        form="round"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="text"
        placeholder="Форма defaultBrick"
        form="defaultBrick"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};

export const AutoCompleteExampleDropdownForm = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        type="text"
        placeholder="Форма списка round"
        dropdownForm="round"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
      <AutoComplete
        type="text"
        placeholder="Форма списка brick"
        dropdownForm="brick"
        value={value}
        items={items}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
