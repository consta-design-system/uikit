import { Example } from '@consta/stand';
import React from 'react';

import { SwitchGroup } from '../../../SwitchGroup';
import { SwitchGroupDefaultItem } from '../../../types';

const items = [
  { label: 'Тёмная тема' },
  { label: 'Розовый текст' },
  { label: 'Мигающие заголовки' },
];

export const SwitchGroupExampleSize = () => {
  const [value, setValue] = React.useState<SwitchGroupDefaultItem[] | null>([
    items[0],
  ]);

  return (
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={(['m', 'l'] as const).map((size) => ({
        label: `size="${size}"`,
        node: (
          <SwitchGroup
            value={value}
            items={items}
            onChange={setValue}
            name={`SwitchGroupExampleSize${size}`}
            size={size}
          />
        ),
      }))}
    />
  );
};
