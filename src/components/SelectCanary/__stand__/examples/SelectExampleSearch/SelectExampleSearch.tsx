import { Example } from '@consta/stand';
import React, { useMemo, useState } from 'react';

import { useDebounce } from '##/hooks/useDebounce';

import { Select, SelectPropGetItemLabel, useSearch } from '../../..';

type ListItem = {
  firstName: string;
  lastName: string;
  role: string;
  id: number;
};

const list: ListItem[] = [
  {
    firstName: 'Илья',
    lastName: 'Васильев',
    role: 'Руководитель',
    id: 1,
  },
  {
    firstName: 'Михаил',
    lastName: 'Гусев',
    role: 'Разработчик',
    id: 2,
  },
  {
    firstName: 'Василий',
    lastName: 'Жмых',
    role: 'Дизайнер',
    id: 3,
  },
  {
    firstName: 'Василий',
    lastName: 'Белый',
    role: 'Разработчик',
    id: 4,
  },
];

const getItemLabel: SelectPropGetItemLabel<ListItem> = ({
  lastName,
  firstName,
}) => `${firstName} ${lastName}`;

const isSubstring = (string: string, substring: string) =>
  string.toLocaleLowerCase().indexOf(substring.toLocaleLowerCase()) !== -1;

export const SelectExampleSearch = () => {
  const [value, setValue] = useState<ListItem[] | null>();
  const [searchValue, setSearchValue] = useState('');
  const setSearchValueDebounce = useDebounce(setSearchValue, 300);

  const items = useMemo(() => {
    const searchWords = searchValue.trim().split(' ');
    const propsToSearch = ['firstName', 'lastName', 'role'] as const;
    const weights: Record<number, number> = {};

    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      let weight = 0;

      for (let index = 0; index < searchWords.length; index++) {
        const word = searchWords[index].toLocaleLowerCase();

        for (let index = 0; index < propsToSearch.length; index++) {
          if (isSubstring(item[propsToSearch[index]], word)) {
            weight++;
          }
        }
      }

      weights[item.id] = weight;
    }

    return list
      .filter((item) => weights[item.id])
      .sort((a, b) => weights[b.id] - weights[a.id]);
  }, [searchValue]);

  return (
    <Example col={1}>
      <Select
        items={items}
        getItemLabel={getItemLabel}
        placeholder="Выберите вариант"
        value={value}
        onChange={setValue}
        clearButton
        onInput={setSearchValueDebounce}
        multiple
        input
      />
    </Example>
  );
};

type Item = {
  label: string;
  id: number | string;
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
  {
    label: 'Четвертый',
    id: 4,
  },
  {
    label: 'Пятый',
    id: 5,
  },
];

export const SelectExampleUseSearch = () => {
  const [value, setValue] = useState<Item | null>();

  return (
    <Example col={1}>
      <Select
        {...useSearch({ items })}
        placeholder="Выберите вариант"
        value={value}
        onChange={setValue}
        clearButton
      />
    </Example>
  );
};
