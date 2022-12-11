import './ComboboxExampleRenderItem.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '../../../../../utils/bem';
import { Badge } from '../../../../Badge/Badge';
import { Combobox } from '../../../Combobox';

const cnComboboxExampleRenderItem = cn('ComboboxExampleRenderItem');

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

export function ComboboxExampleRenderItem() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Combobox
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        searchFunction={searchFunction}
        renderItem={({ item, active, hovered, onClick, onMouseEnter }) => (
          <div
            className={cnComboboxExampleRenderItem('Item', { active, hovered })}
            role="option"
            aria-selected={active}
            aria-hidden="true"
            onMouseEnter={onMouseEnter}
            onClick={onClick}
          >
            {item.label}
            {item.status && (
              <Badge
                className={cnComboboxExampleRenderItem('Badge')}
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
}
