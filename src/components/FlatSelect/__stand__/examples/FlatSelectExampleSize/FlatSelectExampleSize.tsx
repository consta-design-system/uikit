import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';

import { FlatSelect } from '../../..';

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

const sizes: FieldPropSize[] = ['xs', 's', 'm', 'l'];

export const FlatSelectExampleSize = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example
      col={{ 0: 1, 2: 760 }}
      items={sizes}
      getItemLabel={(size) => `size=${size}`}
      getItemNode={(size) => (
        <FlatSelect
          items={items}
          value={value}
          onChange={setValue}
          size={size}
        />
      )}
    />
  );
};
