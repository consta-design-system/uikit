import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Combobox } from '../../../Combobox';

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

export function ComboboxExampleMultiple() {
  const [value, setValue] = useState<Item[] | null>();
  return (
    <Example col={1}>
      <Combobox
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        multiple
      />
    </Example>
  );
}
