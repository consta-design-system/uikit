import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Badge } from '##/components/Badge';
import { ListItem } from '##/components/ListCanary';
import { Radio } from '##/components/Radio';
import { useSearch } from '##/components/SelectCanary';
import { cnMixSpace } from '##/mixs/MixSpace';

import { FlatSelect } from '../../..';

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

export const FlatSelectExampleRenderItem = () => {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <FlatSelect
        {...useSearch({ items, search: searchFunction })}
        placeholder="Поиск"
        clearButton
        value={value}
        onChange={setValue}
        renderItem={({ item, active, hovered, onClick, onMouseEnter, ref }) => {
          return (
            <ListItem
              aria-selected={active}
              active={hovered}
              role="option"
              aria-hidden="true"
              onMouseEnter={onMouseEnter}
              onClick={onClick}
              ref={ref}
              leftSide={<Radio checked={active} tabIndex={-1} />}
              label={
                <>
                  {item.label}
                  {item.status && (
                    <Badge
                      className={cnMixSpace({ mL: 'm' })}
                      as="span"
                      size="s"
                      label={mapLabel[item.status]}
                      status={mapStatus[item.status]}
                    />
                  )}
                </>
              }
            />
          );
        }}
      />
    </Example>
  );
};
