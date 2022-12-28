import './AutoCompleteExampleRenderItem.css';

import { IconEdit } from '@consta/icons/IconEdit';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { AutoComplete } from '##/components/AutoCompleteCanary';
import { cn } from '##/utils/bem';

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
    <Example>
      <AutoComplete
        type="text"
        value={value}
        items={items}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
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
          >
            <IconEdit />
            {item.label}
          </div>
        )}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
