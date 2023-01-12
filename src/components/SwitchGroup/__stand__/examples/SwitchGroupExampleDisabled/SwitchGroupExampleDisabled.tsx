import { Example } from '@consta/stand';
import React from 'react';

import { SwitchGroup } from '../../../SwitchGroup';

type Item = {
  label: string;
  off?: boolean;
};

const items: Item[] = [
  { label: 'Тёмная тема' },
  { label: 'Розовый текст' },
  { label: 'Мигающие заголовки', off: true },
];

export const SwitchGroupExampleDisabled = () => {
  const [value, setValue] = React.useState<Item[] | null>([items[0]]);

  return (
    <Example>
      <SwitchGroup
        value={value}
        items={items}
        getItemDisabled={(item) => item.off}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleDisabled"
      />
    </Example>
  );
};

export const SwitchGroupExampleDisabledGroup = () => {
  const [value, setValue] = React.useState<Item[] | null>([items[0]]);

  return (
    <Example>
      <SwitchGroup
        value={value}
        items={items}
        getItemDisabled={(item) => item.off}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleDisabledGroup"
        disabled
      />
    </Example>
  );
};
