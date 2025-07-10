import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup, choiceGroupViews } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleView = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example
      col={{ 1: 0, 3: 790 }}
      items={[...choiceGroupViews]}
      getItemDescription={(view) => `view=${view}`}
      getItemNode={(view) => (
        <ChoiceGroup
          value={value}
          onChange={setValue}
          items={items}
          getItemLabel={(item) => item}
          view={view}
          name="ChoiceGroupExampleView"
          className={cnChoiceGroupExampleFitMode()}
        />
      )}
    />
  );
};
