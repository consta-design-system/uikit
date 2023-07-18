import { IconQuestion } from '@consta/icons/IconQuestion';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Select } from '../../../Select';

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

export const SelectExampleLabel = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        label="Значение"
        caption={value?.label}
        placeholder="Выберите значение"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};

export const SelectExampleLabelIcon = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        label="Значение"
        labelIcon={IconQuestion}
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
