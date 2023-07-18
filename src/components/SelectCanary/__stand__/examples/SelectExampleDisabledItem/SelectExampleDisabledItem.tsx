import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Select } from '../../../Select';

type Item = {
  label: string;
  id: number;
  disabled: boolean;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
    disabled: true,
  },
  {
    label: 'Второй',
    id: 2,
    disabled: false,
  },
  {
    label: 'Третий',
    id: 3,
    disabled: true,
  },
];

export const SelectExampleDisabledItem = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        placeholder="Выберите значение"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
