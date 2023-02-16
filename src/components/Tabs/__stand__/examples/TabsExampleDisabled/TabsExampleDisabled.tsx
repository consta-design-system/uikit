import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../Tabs';

type Item = {
  label: string;
  disabled?: boolean;
};

const items: Item[] = [
  {
    label: 'Один',
  },
  {
    label: 'Два',
    disabled: true,
  },
  {
    label: 'Три',
  },
];

export const TabsExampleDisabled = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
      />
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        disabled
      />
    </Example>
  );
};
