import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Combobox } from '../../../Combobox';

type Item = {
  label: string;
  id: number;
  groupId: number;
};

type Group = {
  label: string;
  id: number;
};

const items: Item[] = new Array(100000).fill(null).map((_, i) => ({
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

export const ComboboxExampleVirtualScroll = () => {
  const [value, setValue] = useState<Item[] | null>();
  return (
    <Example col={1}>
      <Combobox
        placeholder="У меня очень большой список"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        groups={groups}
        multiple
        selectAll
        virtualScroll
      />
    </Example>
  );
};
