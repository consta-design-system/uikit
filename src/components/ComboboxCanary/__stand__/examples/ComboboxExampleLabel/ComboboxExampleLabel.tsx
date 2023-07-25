import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Combobox } from '../../../ComboboxCanary';

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

export function ComboboxExampleLabel() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Combobox
        label="Выберите что-нибудь"
        caption={value?.label}
        items={items}
        value={value}
        onChange={setValue}
        placeholder="Выберите что-нибудь хорошее"
      />
    </Example>
  );
}
