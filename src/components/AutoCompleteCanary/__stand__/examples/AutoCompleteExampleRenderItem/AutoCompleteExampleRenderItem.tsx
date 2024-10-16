import './AutoCompleteExampleRenderItem.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import { AutoComplete } from '../../..';

const cnAutoCompleteExampleRenderItem = cn('AutoCompleteExampleRenderItem');

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

export const AutoCompleteExampleRenderItem = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={1}>
      <AutoComplete
        value={value}
        items={items}
        renderItem={({ item, active, hovered, onClick, onMouseEnter, ref }) => (
          <div
            className={cnAutoCompleteExampleRenderItem('Item', {
              active,
              hovered,
            })}
            role="option"
            aria-selected={active}
            aria-hidden="true"
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            ref={ref}
          >
            {item.label}
          </div>
        )}
        onChange={setValue}
      />
    </Example>
  );
};
