import './SelectExampleRenderItem.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Badge } from '##/components/Badge';
import { cn } from '##/utils/bem';

import { Select, useSearch } from '../../..';

const cnSelectExampleRenderItem = cn('SelectExampleRenderItem');

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

export const searchCompare = (
  searchValue: string,
  compare?: string,
): boolean => {
  if (!compare) {
    return false;
  }

  return (
    compare.toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) !== -1
  );
};

const searchFunction = (item: Item, searchValue: string): boolean => {
  const searchOfLabel = searchCompare(searchValue, item.label);

  if (searchOfLabel) {
    return searchOfLabel;
  }

  return searchCompare(searchValue, item.status && mapLabel[item.status]);
};

export const SelectExampleRenderItem = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Select
        {...useSearch({ items, search: searchFunction })}
        placeholder="Выберите вариант"
        clearButton
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
            {item.status && (
              <Badge
                className={cnSelectExampleRenderItem('Badge')}
                as="span"
                size="s"
                label={mapLabel[item.status]}
                status={mapStatus[item.status]}
              />
            )}
          </div>
        )}
      />
    </Example>
  );
};
