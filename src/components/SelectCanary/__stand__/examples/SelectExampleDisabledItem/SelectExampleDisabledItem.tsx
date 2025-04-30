import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Select } from '../../..';

type Item = {
  label: string;
  id: number;
  disabled: boolean;
};

const items: Item[] = [
  {
    label: 'Первый — этот вариант не выбрать',
    id: 1,
    disabled: true,
  },
  {
    label: 'Второй',
    id: 2,
    disabled: false,
  },
  {
    label: 'Третий — и этот тоже не выбрать',
    id: 3,
    disabled: true,
  },
];

export const SelectExampleDisabledItem = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
