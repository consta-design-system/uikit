import { Example } from '@consta/stand';
import React from 'react';

import { simpleItems } from '../../../__mocks__/data.mock';
import { RadioGroup } from '../../../RadioGroup';

export const RadioGroupExampleView = () => {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <Example col={{ 0: 1, 2: 760 }}>
      <RadioGroup
        value={value}
        items={simpleItems}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="row"
        view="primary"
      />
      <RadioGroup
        value={value}
        items={simpleItems}
        getItemLabel={(item) => item}
        onChange={({ value }) => setValue(value)}
        direction="row"
        view="ghost"
      />
    </Example>
  );
};
