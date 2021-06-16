import './SelectExampleRenderItem.css';

import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Select } from '../../../Select';

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

export function SelectExampleRenderItem() {
  const [value, setValue] = useState<Item | null>();
  return (
    <div className={cnDocsDecorator('Section')}>
      <Select
        placeholder="Выберите значение"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnSelectExampleRenderItem('Item', { active, hovered })}
            role="option"
            aria-selected={active}
            aria-hidden="true"
            onMouseEnter={onMouseEnter}
            onClick={onClick}
          >
            {item.label}
          </div>
        )}
      />
    </div>
  );
}
