import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';

const items: string[] = ['один', 'два', 'три', 'четыре', 'пять', 'шесть'];

export const ChoiceGroupExampleOne = () => {
  const [value, setValue] = useState<string | null>(items[0]);

  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleOne"
      />
    </Example>
  );
};

export const ChoiceGroupExampleMultiple = () => {
  const [value, setValue] = useState<string[] | null>([]);

  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        multiple
        name="ChoiceGroupExampleMultiple"
      />
    </Example>
  );
};
