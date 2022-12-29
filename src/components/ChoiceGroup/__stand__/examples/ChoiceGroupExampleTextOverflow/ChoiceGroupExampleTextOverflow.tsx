import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

const items: Item[] = [
  'Экриксинатозавр',
  'Пахицефалозавр',
  'Жираффатитан',
  'Аргентинозавр',
  'Кархародонтозавр',
];

export const ChoiceGroupExampleTextOverflow = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        style={{ maxWidth: 600 }}
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleTextOverflow"
        truncate
        className={cnChoiceGroupExampleFitMode()}
      />
    </Example>
  );
};
