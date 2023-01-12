import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../TabsDeprecated';

type Item = string;

const items: Item[] = ['Один', 'Два', 'Три'];

export const TabsExample = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
      />
    </Example>
  );
};
