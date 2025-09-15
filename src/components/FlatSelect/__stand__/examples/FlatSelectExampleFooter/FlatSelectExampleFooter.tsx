import './FlatSelectExampleFooter.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '##/components/Button';
import { useSearch } from '##/components/SelectCanary';
import { cn } from '##/utils/bem';

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

const cnFlatSelectExampleFooter = cn('FlatSelectExampleFooter');

export const FlatSelectExampleFooter = () => {
  const [value, setValue] = useState<FlatSelectItemDefault | null>();
  return (
    <Example col={1}>
      <FlatSelect
        {...useSearch({ items })}
        className={cnFlatSelectExampleFooter()}
        placeholder="Поиск"
        value={value}
        onChange={setValue}
        bordered
        footer={[
          <Button label="Сбросить" view="ghost" />,
          <Button label="Применить" />,
        ]}
      />
    </Example>
  );
};
