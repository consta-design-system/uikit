import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { ChipsChoice, ChipsDefaultItem } from '##/components/Chips';

export const items: ChipsDefaultItem[] = [
  {
    status: 'success',
    label: 'Согласован',
  },
  {
    status: 'warning',
    label: 'Ожидает',
  },
  {
    status: 'alert',
    label: 'Отказано',
  },
];

export const ChipsChoiceExample = () => {
  const [value, setValue] = useState(items[0]);
  return (
    <Example>
      <ChipsChoice value={value} onChange={setValue} items={items} />
    </Example>
  );
};
