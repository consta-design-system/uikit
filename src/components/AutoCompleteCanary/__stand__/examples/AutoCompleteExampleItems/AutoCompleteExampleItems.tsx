import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { basicItems } from '##/components/AutoCompleteCanary/__mocks__/data.mock';
import { AutoComplete } from '##/components/AutoCompleteCanary/AutoCompleteCanary';

export const AutoCompleteExampleItems = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        type="text"
        placeholder="Введите значение"
        value={value}
        items={basicItems}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
