import './SelectExampleRenderItem.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Select } from '##/components/Select';

import { cn } from '../../../../../utils/bem';

const cnSelectExampleRenderItem = cn('SelectExampleRenderItem');

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

export const SelectExampleRenderItem = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        placeholder="Выберите значение"
        items={items}
        value={value}
        onChange={setValue}
        renderItem={({ item, active, hovered, onClick, onMouseEnter, ref }) => (
          <div
            className={cnSelectExampleRenderItem('Item', { active, hovered })}
            aria-selected={active}
            aria-hidden="true"
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            ref={ref}
          >
            {item.label}
          </div>
        )}
      />
    </Example>
  );
};
