import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../Tabs';

const items: string[] = ['Один', 'Два', 'Три'];

const getItemLabel = (label: string) => label;

export const TabsExampleAs = () => {
  const [value, setValue] = useState<string | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemAs={() => 'a'}
        getItemAttributes={(item) => ({ href: item })}
        getItemLabel={getItemLabel}
      />
    </Example>
  );
};
