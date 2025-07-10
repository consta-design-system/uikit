import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup, choiceGroupSizes } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleSize = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example
      col={{ 1: 0, 2: 600 }}
      items={[...choiceGroupSizes]}
      getItemDescription={(size) => `size=${size}`}
      getItemNode={(size) => (
        <ChoiceGroup
          value={value}
          onChange={setValue}
          items={items}
          getItemLabel={(item) => item}
          size={size}
          className={cnChoiceGroupExampleFitMode()}
          name="ChoiceGroupExampleSize"
        />
      )}
    />
  );
};
