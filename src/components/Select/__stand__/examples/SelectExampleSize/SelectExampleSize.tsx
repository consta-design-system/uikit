import React, { useState } from 'react';

import { cnMixSpace } from '../../../../../mixs/MixSpace/MixSpace';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
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

export const SelectExampleSize = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <div className={cnDocsDecorator('Section')}>
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Размер xs"
        size="xs"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Размер s"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Размер m"
        size="m"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <Select
        className={cnMixSpace({ mB: 'm' })}
        placeholder="Размер l"
        size="l"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </div>
  );
};
