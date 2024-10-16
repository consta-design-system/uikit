import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { fieldPropSize } from '##/components/FieldComponents/__mocks__/variants';

import { AutoComplete } from '../../..';

type Item = {
  label: string;
  id: number;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
];

export const AutoCompleteExampleSize = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example
      col={{ 1: 0, 2: 600 }}
      items={fieldPropSize}
      getItemNode={(size) => {
        return (
          <AutoComplete
            size={size}
            value={value}
            items={items}
            onChange={setValue}
            placeholder="Начните вводить текст"
          />
        );
      }}
      getItemLabel={(item) => `size = ${item}`}
    />
  );
};
