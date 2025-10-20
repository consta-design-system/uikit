import { Example } from '@consta/stand';
import React, { useMemo, useState } from 'react';

import { useSearch } from '##/components/SelectCanary';
import { useDebounce } from '##/hooks/useDebounce';

import { FlatSelect, FlatSelectItemDefault } from '../../..';

const items: FlatSelectItemDefault[] = [
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

const search = (item: FlatSelectItemDefault, input: string) => {
  return item.label.toLowerCase().includes(input.toLowerCase());
};

export const FlatSelectExampleInput = () => {
  const [value, setValue] = useState<FlatSelectItemDefault | null>();
  const [inputState, setInputState] = useState('');

  const filteredItems = useMemo(() => {
    if (!inputState) return items;
    return items.filter((item) => search(item, inputState));
  }, [inputState]);

  return (
    <Example col={1}>
      <FlatSelect
        items={filteredItems}
        onInput={useDebounce(setInputState, 300)}
        value={value}
        onChange={setValue}
        placeholder="Поиск"
        input
      />
    </Example>
  );
};

export const FlatSelectExampleUseSearch = () => {
  const [value, setValue] = useState<FlatSelectItemDefault | null>();
  return (
    <Example col={1}>
      <FlatSelect
        {...useSearch({ items })}
        placeholder="Поиск"
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
