import React, { useState } from 'react';

import { basicItems } from '##/components/AutoComplete/__mocks__/data.mock';
import { AutoComplete } from '##/components/AutoComplete/AutoComplete';

export const AutoCompleteExampleBasic = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <AutoComplete
      value={value}
      items={basicItems}
      getItemKey={(item) => item}
      getItemLabel={(item) => item}
      onChange={({ value }) => setValue(value)}
      type="text"
    />
  );
};
