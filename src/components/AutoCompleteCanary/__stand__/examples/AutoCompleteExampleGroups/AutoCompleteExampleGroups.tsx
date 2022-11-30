import { Example } from '@consta/stand';
import React, { useState } from 'react';

import {
  groups,
  items,
} from '##/components/AutoCompleteCanary/__mocks__/data.mock';
import { AutoComplete } from '##/components/AutoCompleteCanary/AutoCompleteCanary';

export const AutoCompleteExampleGroups = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        type="text"
        placeholder="Начните вводить цвет"
        value={value}
        items={items}
        groups={groups}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
