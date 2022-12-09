import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleView = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        view="primary"
        name="ChoiceGroupExampleView"
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        view="ghost"
        name="ChoiceGroupExampleView"
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        view="secondary"
        name="ChoiceGroupExampleView"
      />
    </Example>
  );
};
