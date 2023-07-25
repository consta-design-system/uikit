import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Select } from '##/components/SelectCanary';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';

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

export const SelectExampleView = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Вид default"
        view="default"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Вид clear"
        view="clear"
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
