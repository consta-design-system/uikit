import { Example } from '@consta/stand';
import React from 'react';

import { simpleItems } from '../../../__mocks__/data.mock';
import { RadioGroup } from '../../../RadioGroupDeprecated';

export function RadioGroupExampleSize() {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <Example>
      <RadioGroup
        value={value}
        items={simpleItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="row"
        size="m"
      />
      <RadioGroup
        value={value}
        items={simpleItems}
        getLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="row"
        size="l"
      />
    </Example>
  );
}
