import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { FieldPropStatus } from '##/components/FieldComponents';

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

const statuses: FieldPropStatus[] = ['alert', 'success', 'warning'];

export const SelectExampleStatus = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example
      col={1}
      items={statuses}
      getItemNode={(status) => (
        <Select
          placeholder={status}
          items={items}
          value={value}
          onChange={setValue}
          status={status}
        />
      )}
    />
  );
};
