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

export const SelectExampleSize = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Размер xs"
        size="xs"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Размер s"
        size="s"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Размер m"
        size="m"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Размер l"
        size="l"
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
