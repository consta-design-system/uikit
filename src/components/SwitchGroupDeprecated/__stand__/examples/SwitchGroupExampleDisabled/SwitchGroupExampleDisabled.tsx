import { Example } from '@consta/stand';
import React from 'react';

import { SwitchGroup } from '../../../SwitchGroupDeprecated';

type Item = {
  name: string;
  disabled?: boolean;
};

const items: Item[] = [
  { name: 'Тёмная тема' },
  { name: 'Розовый текст' },
  { name: 'Мигающие заголовки', disabled: true },
];

export function SwitchGroupExampleDisabled() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <SwitchGroup
        value={value}
        items={items}
        getLabel={(item) => item.name}
        getDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleDisabled"
      />
    </Example>
  );
}

export function SwitchGroupExampleDisabledGroup() {
  const [value, setValue] = React.useState<Item[] | null>(null);

  return (
    <Example>
      <SwitchGroup
        value={value}
        items={items}
        getLabel={(item) => item.name}
        getDisabled={(item) => item.disabled}
        onChange={({ value }) => setValue(value)}
        name="SwitchGroupExampleDisabledGroup"
        disabled
      />
    </Example>
  );
}
