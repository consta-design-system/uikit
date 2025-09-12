import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { FlatSelect, FlatSelectItemDefault } from '../../..';

const items: FlatSelectItemDefault[] = [
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

export const FlatSelectExampleItems = () => {
  const [value, setValue] = useState<FlatSelectItemDefault | null>();
  return (
    <Example col={1}>
      <FlatSelect items={items} value={value} onChange={setValue} />
    </Example>
  );
};
