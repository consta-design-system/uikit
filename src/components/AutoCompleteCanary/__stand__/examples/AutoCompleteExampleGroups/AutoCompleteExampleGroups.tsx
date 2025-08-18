import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { groups, items } from '../../../__mocks__/data.mock';
import { AutoComplete } from '../../../AutoCompleteCanary';

export const AutoCompleteExampleGroups = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={1}>
      <AutoComplete
        type="text"
        placeholder="Начните вводить цвет"
        value={value}
        items={items}
        groups={groups}
        onChange={setValue}
      />
    </Example>
  );
};
