import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Select } from '../../../SelectDeprecated';

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

export const SelectExampleDisabled = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        placeholder="Выберите значение"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        disabled
      />
    </Example>
  );
};
