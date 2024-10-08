import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { fieldPropStatus } from '##/components/FieldComponents/__mocks__/variants';

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

export const AutoCompleteExampleStatus = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example
      col={{ 1: 0, 2: 600, 3: 800 }}
      items={fieldPropStatus}
      getItemNode={(status) => {
        return (
          <AutoComplete
            placeholder="Начните вводить текст"
            value={value}
            items={items}
            onChange={setValue}
            status={status}
          />
        );
      }}
      getItemLabel={(item) => item}
    />
  );
};
