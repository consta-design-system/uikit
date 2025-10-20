import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { useSearch } from '##/components/SelectCanary';

import { FlatSelect, FlatSelectPropForm } from '../../..';

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

const forms: FlatSelectPropForm[] = ['default', 'brick', 'round'];
const borders: boolean[] = [true, false];

const getItems = () => {
  const items: [FlatSelectPropForm, boolean][] = [];
  forms.forEach((form) => {
    borders.forEach((border) => {
      items.push([form, border]);
    });
  });

  return items;
};

export const FlatSelectExampleForm = () => {
  const [value, setValue] = useState<Item | null>();
  const propsSearch = useSearch({ items });

  return (
    <Example
      col={{ 0: 1, 2: 760 }}
      items={getItems()}
      getItemLabel={([form, border]) => `form=${form}, border=${border}`}
      getItemNode={([form, border]) => (
        <FlatSelect
          {...propsSearch}
          placeholder="Поиск"
          value={value}
          onChange={setValue}
          form={form}
          bordered={border}
        />
      )}
    />
  );
};
