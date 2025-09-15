import './FlatSelectExampleVirtualScroll.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { useSearch } from '##/components/SelectCanary';
import { cn } from '##/utils/bem';

import { FlatSelect } from '../../..';

type Item = {
  label: string;
  id: number;
  groupId: number;
};

type Group = {
  label: string;
  id: number;
};

const items: Item[] = new Array(1000).fill(null).map((_, i) => ({
  label: `Опция ${i + 1}`,
  groupId: Math.floor(i / 100) + 1,
  id: i,
}));

const groups: Group[] = new Array(items.length / 100)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    label: `Группа ${i + 1}`,
  }));

const cnFlatSelectExampleVirtualScroll = cn('FlatSelectExampleVirtualScroll');

export const FlatSelectExampleVirtualScroll = () => {
  const [value, setValue] = useState<Item[] | null>();

  return (
    <Example col={1}>
      <FlatSelect
        {...useSearch({ items })}
        listClassName={cnFlatSelectExampleVirtualScroll('List')}
        placeholder="Поиск"
        value={value}
        onChange={setValue}
        groups={groups}
        multiple
        selectAll
        virtualScroll
      />
    </Example>
  );
};
