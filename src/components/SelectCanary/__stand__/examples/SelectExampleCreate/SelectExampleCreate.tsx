import { Example } from '@consta/stand';
import React, { useCallback, useState } from 'react';

import { getSearchFunctionDefault, Select, useSearch } from '../../..';

const getItemLabel = (item: string) => item;

export function SelectExampleCreate() {
  const [value, setValue] = useState<string | null>();
  const [list, setList] = useState<string[]>(['Первый', 'Второй', 'Третий']);
  // const { items, labelForEmptyItems, onInput } = useSearch({
  //   items: list,
  //   search: getSearchFunctionDefault(getItemLabel),
  // });
  // const onCreate = useCallback(
  //   (label: string) => setList((state) => [label, ...state]),
  //   [],
  // );

  console.log('SelectExampleCreate');

  return (
    <Example col={1}>
      <Select
        placeholder="Выберите вариант"
        items={list}
        value={value}
        onChange={setValue}
        getItemLabel={getItemLabel}
        getItemKey={getItemLabel}
        // onCreate={!items.length ? onCreate : undefined}
        onCreate={() => {}}
        // labelForEmptyItems={labelForEmptyItems}
        // onInput={onInput}
        input
      />
    </Example>
  );
}
