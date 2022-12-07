import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

const items: string[] = ['один', 'два', 'три', 'четыре', 'пять', 'шесть'];

const cnChoiceGroupExampleMultiple = cn('ChoiceGroupExampleMultiple');

export const ChoiceGroupExampleOne = () => {
  const [value, setValue] = useState<string | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        name="ChoiceGroupExampleOne"
        className={cnChoiceGroupExampleMultiple()}
      />
    </Example>
  );
};

export const ChoiceGroupExampleMultiple = () => {
  const [value, setValue] = useState<string[] | null>([]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getLabel={(item) => item}
        multiple
        name="ChoiceGroupExampleMultiple"
        className={cnChoiceGroupExampleMultiple()}
      />
    </Example>
  );
};
