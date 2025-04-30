import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { FieldPropView } from '##/components/FieldComponents';

import { Select } from '../../..';

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

const views: FieldPropView[] = ['default', 'clear'];

export const SelectExampleView = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example
      col={1}
      items={views}
      getItemNode={(view) => (
        <Select
          placeholder={view}
          items={items}
          value={value}
          onChange={setValue}
          view={view}
        />
      )}
    />
  );
};
