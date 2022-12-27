import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { simpleItems } from '../../../__mocks__/data.mock';
import { RadioGroup } from '../../../RadioGroup';

const cnRadioGroupExampleSize = cn('RadioGroupExampleSize');

export const RadioGroupExampleSize = () => {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <Example
      getItemNode={(node) => node}
      items={(['m', 'l'] as const).map((size) => (
        <RadioGroup
          value={value}
          items={simpleItems}
          getItemLabel={(item) => item}
          onChange={({ value }) => setValue(value)}
          direction="row"
          className={cnRadioGroupExampleSize()}
          size={size}
        />
      ))}
    />
  );
};
