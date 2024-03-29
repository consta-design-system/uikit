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

export const SwitchGroupExampleDirection = () => {
  const [value, setValue] = React.useState<Item[] | null>([items[0]]);

  return (
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={(['column', 'row'] as const).map((direction) => ({
        label: `direction="${direction}"`,
        node: (
          <SwitchGroup
            value={value}
            items={items}
            getItemLabel={(item) => item.name}
            getItemDisabled={(item) => item.disabled}
            onChange={setValue}
            name={`SwitchGroupExample${direction}`}
            direction={direction}
          />
        ),
      }))}
    />
  );
};
