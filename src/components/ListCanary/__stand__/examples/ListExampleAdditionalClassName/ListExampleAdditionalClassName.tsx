import './ListExampleAdditionalClassName.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { List } from '##/components/ListCanary';
import { cn } from '##/utils/bem';

type Item = { label: string; marker: 'red' | 'green' };

const items: Item[] = [
  {
    label: 'Первый',
    marker: 'red',
  },
  {
    label: 'Второй',
    marker: 'green',
  },
  {
    label: 'Третий',
    marker: 'red',
  },
];

const cnListExampleAdditionalClassName = cn('ListExampleAdditionalClassName');

export const ListExampleAdditionalClassName = () => {
  const [checked, setChecked] = useState<Item | undefined>(undefined);

  return (
    <Example>
      <List
        onItemClick={setChecked}
        items={items}
        getItemAdditionalClassName={({ marker, label }) =>
          cnListExampleAdditionalClassName('Item', {
            marker,
            checked: checked?.label === label,
          })
        }
      />
    </Example>
  );
};
