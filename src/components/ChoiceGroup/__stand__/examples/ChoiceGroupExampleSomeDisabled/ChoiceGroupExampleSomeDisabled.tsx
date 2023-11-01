import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

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
        getItemLabel={(item) => item.name}
        name="ChoiceGroupExampleSomeDisabled"
        getItemDisabled={(item: Item) => item.disabled}
        className={cnChoiceGroupExampleFitMode()}
      />
    </Example>
  );
};
