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

export const SelectExampleStatus = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="default"
        caption="default"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="alert"
        caption="alert"
        status="alert"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="warning"
        caption="warning"
        status="warning"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="success"
        caption="success"
        size="s"
        status="success"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
