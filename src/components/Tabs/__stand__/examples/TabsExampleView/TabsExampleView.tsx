import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../Tabs';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const TabsExampleView = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={setValue}
        items={items}
        getItemLabel={(item) => item}
        view="bordered"
      />
      <Tabs
        value={value}
        onChange={setValue}
        items={items}
        getItemLabel={(item) => item}
        view="clear"
      />
    </Example>
  );
};
