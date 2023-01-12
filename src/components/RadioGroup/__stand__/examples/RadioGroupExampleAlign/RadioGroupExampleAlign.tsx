import { Example } from '@consta/stand';
import React from 'react';

import { alignItems, simpleItems } from '../../../__mocks__/data.mock';
import { RadioGroup } from '../../../RadioGroup';

export const RadioGroupExampleAlign = () => {
  const [value, setValue] = React.useState<string | null>(alignItems[0]);

  return (
    <Example col={{ 0: 1, 2: 600 }}>
      <RadioGroup
        value={value}
        items={alignItems}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        align="top"
      />
      <RadioGroup
        value={value}
        items={alignItems}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        align="center"
      />
    </Example>
  );
};

export const RadioGroupExampleColumn = () => {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <Example>
      <RadioGroup
        value={value}
        items={simpleItems}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="column"
      />
    </Example>
  );
};

export const RadioGroupExampleRow = () => {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <Example>
      <RadioGroup
        value={value}
        items={simpleItems}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="row"
      />
    </Example>
  );
};
