import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../TabsDeprecated';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const TabsExampleView = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        view="bordered"
      />
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        view="clear"
      />
    </Example>
  );
};
