import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChoiceGroup } from '../../../ChoiceGroupDeprecated';

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
      <div style={{ maxWidth: 600 }}>
        <ChoiceGroup
          value={value}
          onChange={({ value }) => setValue(value)}
          items={items}
          getLabel={(item) => item}
          name="ChoiceGroupExampleTextOverflow"
          truncate
        />
      </div>
    </Example>
  );
};
