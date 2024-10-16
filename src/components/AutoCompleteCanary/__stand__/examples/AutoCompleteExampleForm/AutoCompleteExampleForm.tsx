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

export const AutoCompleteExampleForm = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={{ 1: 0, 2: 600 }}>
      <AutoComplete
        type="text"
        placeholder="Форма round"
        form="round"
        value={value}
        items={items}
        onChange={setValue}
      />
      <AutoComplete
        type="text"
        placeholder="Форма brick"
        form="brick"
        value={value}
        items={items}
        onChange={setValue}
      />
    </Example>
  );
};

export const AutoCompleteExampleDropdownForm = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={{ 1: 0, 2: 600 }}>
      <AutoComplete
        type="text"
        placeholder="Форма списка round"
        form="round"
        dropdownForm="round"
        value={value}
        items={items}
        onChange={setValue}
      />
      <AutoComplete
        type="text"
        placeholder="Форма списка brick"
        form="brick"
        dropdownForm="brick"
        value={value}
        items={items}
        onChange={setValue}
      />
    </Example>
  );
};
