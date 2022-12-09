import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleForm = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        form="default"
        name="ChoiceGroupExampleForm"
        className={cnChoiceGroupExampleFitMode()}
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        form="brick"
        name="ChoiceGroupExampleForm"
        className={cnChoiceGroupExampleFitMode()}
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        form="round"
        name="ChoiceGroupExampleForm"
        className={cnChoiceGroupExampleFitMode()}
      />
    </Example>
  );
};
