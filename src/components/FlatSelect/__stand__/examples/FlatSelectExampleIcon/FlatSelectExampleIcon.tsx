import { IconSearchStroked } from '@consta/icons/IconSearchStroked';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { useSearch } from '##/components/SelectCanary';

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

export const FlatSelectExampleIcon = () => {
  const [value, setValue] = useState<FlatSelectItemDefault | null>();
  return (
    <Example col={1}>
      <FlatSelect
        {...useSearch({ items })}
        placeholder="Поиск"
        iconLeft={IconSearchStroked}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
