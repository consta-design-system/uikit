import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { basicItems } from '##/components/AutoComplete/__mocks__/data.mock';

import { AutoComplete } from '../../..';

export const AutoCompleteExampleBasic = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example>
      <AutoComplete
        value={value}
        items={basicItems}
        getItemKey={(item) => item}
        getItemLabel={(item) => item}
        onChange={setValue}
        type="text"
      />
    </Example>
  );
};
