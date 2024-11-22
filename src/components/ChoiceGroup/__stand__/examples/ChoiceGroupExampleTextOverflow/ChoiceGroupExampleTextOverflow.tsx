import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroup';
import { cnChoiceGroupExampleFitMode } from '../ChoiceGroupExampleFitMode';

type Item = string;

/* cspell:disable */
const items: Item[] = [
  'Экриксинатозавр',
  'Пахицефалозавр',
  'Жираффатитан',
  'Аргентинозавр',
  'Кархародонтозавр',
];
/* cspell:enable */

export const ChoiceGroupExampleTextOverflow = () => {
  const [value, setValue] = useState<Item | null>(items[0]);
  return (
    <Example>
      <ChoiceGroup
        style={{ maxWidth: 600 }}
        value={value}
        onChange={setValue}
        items={items}
        getItemLabel={(item) => item}
        name="ChoiceGroupExampleTextOverflow"
        truncate
        className={cnChoiceGroupExampleFitMode()}
      />
    </Example>
  );
};
