import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs, tabsLinePositions } from '../../../TabsDeprecated';

type Item = string;

const items: Item[] = ['Первый', 'Второй', 'Третий'];

export const TabsExampleLinePosition = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={{ 1: 0, 2: 600 }}>
      {tabsLinePositions.map((linePosition) => (
        <div key={linePosition} style={{ marginBottom: 'var(--space-l)' }}>
          <p>
            <code>linePosition=&quot;{linePosition}&quot;</code>
          </p>
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <Tabs
              value={value}
              onChange={({ value }) => setValue(value)}
              items={items}
              getLabel={(item) => item}
              linePosition={linePosition}
            />
          </div>
        </div>
      ))}
    </Example>
  );
};
