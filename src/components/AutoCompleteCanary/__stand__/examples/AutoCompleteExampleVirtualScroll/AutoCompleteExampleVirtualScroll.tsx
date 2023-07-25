import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { AutoComplete } from '../../..';

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

export const AutoCompleteExampleVirtualScroll = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={1}>
      <AutoComplete
        placeholder="У меня очень большой список"
        items={items}
        value={value}
        onChange={setValue}
        groups={groups}
        virtualScroll
        searchFunction={(item, searchValue) => {
          if (!searchValue) {
            return true;
          }
          return (
            item.label
              .toLocaleLowerCase()
              .indexOf(searchValue.toLocaleLowerCase()) !== -1
          );
        }}
      />
    </Example>
  );
};
