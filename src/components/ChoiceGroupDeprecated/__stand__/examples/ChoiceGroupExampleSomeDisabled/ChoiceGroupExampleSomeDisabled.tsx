import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

type Item = { name: string; disabled?: boolean };

const items: Item[] = [
  { name: 'один' },
  { name: 'два' },
  { name: 'три', disabled: true },
  { name: 'четыре', disabled: true },
];

export const ChoiceGroupExampleSomeDisabled = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item.name}
        name="ChoiceGroupExampleSomeDisabled"
        getDisabled={(item: Item) => item.disabled}
      />
    </Example>
  );
};
