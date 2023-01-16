import { Example } from '@consta/stand';
import React from 'react';

import { cn } from '##/utils/bem';

import { simpleItems } from '../../../__mocks__/data.mock';
import { RadioGroup, RadioGroupPropSize } from '../../../RadioGroup';

const cnRadioGroupExampleSize = cn('RadioGroupExampleSize');

const items: RadioGroupPropSize[] = ['l', 'm', 's', 'xs'];

export const RadioGroupExampleSize = () => {
  const [value, setValue] = React.useState<string | null>(simpleItems[0]);

  return (
    <Example
      col={{ 1: 0, 2: 400, 4: 720 }}
      items={items}
      getItemNode={(size) => (
        <RadioGroup
          value={value}
          items={simpleItems}
          getItemLabel={(item) => item}
          onChange={({ value }) => setValue(value)}
          className={cnRadioGroupExampleSize()}
          size={size}
        />
      )}
      getItemDescription={(size) => `size = ${size}`}
    />
  );
};
