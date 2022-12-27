import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../Tabs';

const items = ['Таб номер один', 'Таб номер два', 'Таб номер три'];

export const TabsExampleFitModeDropdown = () => {
  const [value, setValue] = useState(items[0]);
  return (
    <Example col={1}>
      {[300, 200, 100].map((width) => (
        <div key={width} style={{ width }}>
          <Tabs
            fitMode="dropdown"
            value={value}
            onChange={({ value }) => setValue(value)}
            items={items}
            getItemLabel={(item) => item}
          />
        </div>
      ))}
    </Example>
  );
};
