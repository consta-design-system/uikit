import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleSize = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example col={1}>
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        size="xs"
        className={cnChoiceGroupExampleFitMode()}
        name="ChoiceGroupExampleSize"
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        size="s"
        className={cnChoiceGroupExampleFitMode()}
        name="ChoiceGroupExampleSize"
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        size="m"
        className={cnChoiceGroupExampleFitMode()}
        name="ChoiceGroupExampleSize"
      />
      <ChoiceGroup
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        size="l"
        className={cnChoiceGroupExampleFitMode()}
        name="ChoiceGroupExampleSize"
      />
    </Example>
  );
};
