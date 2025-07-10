import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup, choiceGroupForms } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

const items: Item[] = ['один', 'два', 'три'];

export const ChoiceGroupExampleForm = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example
      col={{ 1: 0, 3: 790 }}
      items={[...choiceGroupForms]}
      getItemDescription={(form) => `form=${form}`}
      getItemNode={(form) => (
        <ChoiceGroup
          value={value}
          onChange={setValue}
          items={items}
          getItemLabel={(item) => item}
          form={form}
          name="ChoiceGroupExampleForm"
          className={cnChoiceGroupExampleFitMode()}
        />
      )}
    />
  );
};
