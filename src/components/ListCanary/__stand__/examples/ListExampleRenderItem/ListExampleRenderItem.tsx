import './ListExampleRenderItem.css';

import React, { useState } from 'react';

import { Badge } from '##/components/Badge';
import { List } from '##/components/ListCanary/ListCanary';
import { cnDocsDecorator } from '##/uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '##/uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '##/utils/bem';

const cnListExampleRenderItem = cn('ListExampleRenderItem');

type Item = {
  label: string;
  id: number;
  status?: 'repairs' | 'serviceable';
};

const items: Item[] = [
  {
    label: 'Принтер',
    id: 1,
    status: 'repairs',
  },
  {
    label: 'Монитор',
    id: 2,
    status: 'serviceable',
  },
  {
    label: 'Ноутбук',
    id: 3,
    status: 'serviceable',
  },
  {
    label: 'Стол',
    id: 4,
  },
];

const mapLabel = {
  repairs: 'На ремонте',
  serviceable: 'Исправен',
} as const;

const mapStatus = {
  repairs: 'error',
  serviceable: 'success',
} as const;

export const ListExampleRenderItem = () => {
  const [value, setValue] = useState<Item | null>(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <List
        value={value}
        onChange={({ value }) => setValue(value)}
        items={items}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnListExampleRenderItem('Item', { active, hovered })}
            role="option"
            aria-selected={active}
            aria-hidden="true"
            onMouseEnter={onMouseEnter}
            onClick={onClick}
          >
            {item.label}
            {item.status && (
              <Badge
                className={cnListExampleRenderItem('Badge')}
                as="span"
                size="s"
                label={mapLabel[item.status]}
                status={mapStatus[item.status]}
              />
            )}
          </div>
        )}
      />
    </StoryBookExample>
  );
};
