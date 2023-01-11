import { Example } from '@consta/stand';
import React from 'react';

import { SwitchGroup } from '../../../SwitchGroup';

type Item = {
  name: string;
  disabled?: boolean;
};

const items: Item[] = [
  { name: 'Тёмная тема' },
  { name: 'Розовый текст' },
  { name: 'Мигающие заголовки' },
];

export const SwitchGroupExampleView = () => {
  const [value, setValue] = React.useState<Item[] | null>([items[0]]);

  return (
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={(['primary', 'ghost'] as const).map((view) => ({
        label: `view="${view}"`,
        node: (
          <SwitchGroup
            value={value}
            getItemLabel={(item) => item.name}
            items={items}
            onChange={({ value }) => setValue(value)}
            name={`SwitchGroupExampleView${view}`}
            view={view}
          />
        ),
      }))}
    />
  );
};
