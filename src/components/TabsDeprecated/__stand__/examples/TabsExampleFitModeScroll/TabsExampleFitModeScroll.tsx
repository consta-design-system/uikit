import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Tabs } from '../../../TabsDeprecated';

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
          getLabel={(item) => item}
        />
      </div>
    </Example>
  );
};
