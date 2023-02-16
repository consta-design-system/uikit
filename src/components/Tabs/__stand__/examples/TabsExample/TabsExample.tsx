import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../Tabs';

const items: string[] = ['Один', 'Два', 'Три'];

const getItemLabel = (label: string) => label;

export const TabsExample = () => {
  const [value, setValue] = useState<string | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={getItemLabel}
      />
    </Example>
  );
};
