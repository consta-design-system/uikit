import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { Select } from '../../../Select';

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

export const SelectExampleForm = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Форма round"
        form="round"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Форма brickDefault"
        form="brickDefault"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
