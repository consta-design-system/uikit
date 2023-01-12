import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../Tabs';

const items = ['Таб номер один', 'Таб номер два', 'Таб номер три'];

export const TabsExampleFitModeScroll = () => {
  const [value, setValue] = useState(items[0]);
  return (
    <Example col={1}>
      <div style={{ width: 250 }}>
        <Tabs
          fitMode="scroll"
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getItemLabel={(item) => item}
        />
      </div>
    </Example>
  );
};
