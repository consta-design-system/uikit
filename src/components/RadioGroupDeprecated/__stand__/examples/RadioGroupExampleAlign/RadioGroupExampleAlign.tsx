import { Example } from '@consta/stand';
import React from 'react';

import { alignItems, simpleItems } from '../../../__mocks__/data.mock';
import { RadioGroup } from '../../../RadioGroupDeprecated';

export function RadioGroupExampleAlign() {
  const [value, setValue] = React.useState<string | null>(alignItems[0]);

  return (
    <Example>
      <RadioGroup
        value={value}
        items={alignItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        align="top"
      />
      <RadioGroup
        value={value}
        items={alignItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        align="center"
      />
    </Example>
  );
}

export function RadioGroupExampleColumn() {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <Example>
      <RadioGroup
        value={value}
        items={simpleItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="column"
      />
    </Example>
  );
}

export function RadioGroupExampleRow() {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <Example>
      <RadioGroup
        value={value}
        items={simpleItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="row"
      />
    </Example>
  );
}
