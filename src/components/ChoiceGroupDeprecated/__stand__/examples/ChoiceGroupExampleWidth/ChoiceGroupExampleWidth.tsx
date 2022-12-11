import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleWidth = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        width="full"
        name="ChoiceGroupExampleWidth"
      />
    </Example>
  );
};
