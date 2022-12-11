import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleDisabled = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleDisabled"
        disabled
        className={cnChoiceGroupExampleFitMode()}
      />
    </Example>
  );
};
