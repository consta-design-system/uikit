import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { FieldPropView } from '##/components/FieldComponents';
import { useSearch } from '##/components/SelectCanary';

import { FlatSelect } from '../../..';

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

export const FlatSelectExampleView = () => {
  const [value, setValue] = useState<Item | null>();
  const propsSearch = useSearch({ items });
  return (
    <Example
      col={{ 0: 1, 2: 760 }}
      items={views}
      getItemLabel={(view) => `view=${view}`}
      getItemNode={(view) => (
        <FlatSelect
          {...propsSearch}
          placeholder="Поиск"
          value={value}
          onChange={setValue}
          view={view}
        />
      )}
    />
  );
};
