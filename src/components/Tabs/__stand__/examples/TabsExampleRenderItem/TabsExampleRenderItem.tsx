import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cnTabsTab, Tabs } from '##/components/Tabs';

type Item = string;

const items: Item[] = ['Один', 'Два', 'Три'];

export const TabsExampleRenderItem = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <Tabs
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        size="m"
        renderItem={({ label, checked, onChange, size }) => (
          <button
            type="button"
            onClick={onChange}
            className={cnTabsTab({ checked, size })}
          >
            <span
              style={{ marginRight: 'var(--space-m)' }}
              role="img"
              aria-label="img"
            >
              {checked ? '🤘' : '✋'}
            </span>
            {label}
          </button>
        )}
      />
    </Example>
  );
};
