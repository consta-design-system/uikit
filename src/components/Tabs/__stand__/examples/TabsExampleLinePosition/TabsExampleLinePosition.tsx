import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs, TabsPropLinePosition } from '../../../Tabs';

type Item = string;

const items: Item[] = ['Первый', 'Второй', 'Третий'];

const positions: TabsPropLinePosition[] = ['bottom', 'top', 'left', 'right'];

export const TabsExampleLinePosition = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example
      separately
      col={{ 1: 0, 2: 600 }}
      items={positions}
      getItemNode={(linePosition) => (
        <Tabs
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemLabel={(item) => item}
          linePosition={linePosition}
        />
      )}
      getItemDescription={(linePosition) => `linePosition=${linePosition}`}
    />
  );
};
