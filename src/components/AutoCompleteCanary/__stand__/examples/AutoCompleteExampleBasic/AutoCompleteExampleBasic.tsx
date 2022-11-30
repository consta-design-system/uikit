import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { AutoComplete } from '##/components/AutoCompleteCanary';
import { basicItems } from '##/components/AutoCompleteCanary/__mocks__/data.mock';

export const AutoCompleteExampleBasic = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        value={value}
        items={basicItems}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        type="text"
      />
    </Example>
  );
};
