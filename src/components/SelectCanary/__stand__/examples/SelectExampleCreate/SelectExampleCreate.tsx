import { Example } from '@consta/stand';
import React, { useCallback, useState } from 'react';

import { getSearchFunctionDefault, Select, useSearch } from '../../..';

const getItemLabel = (item: string) => item;

export function SelectExampleCreate() {
  const [value, setValue] = useState<string | null>();
  const [list, setList] = useState<string[]>(['Первый', 'Второй', 'Третий']);
  const { items, labelForEmptyItems, onInput } = useSearch({
    items: list,
    search: getSearchFunctionDefault(getItemLabel),
  });
  const onCreate = useCallback(
    (label: string) => setList((state) => [label, ...state]),
    [],
  );

  return (
    <Example col={1}>
      <Select
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onChange={setValue}
        getItemLabel={getItemLabel}
        getItemKey={getItemLabel}
        onCreate={!items.length ? onCreate : undefined}
        labelForEmptyItems={labelForEmptyItems}
        onInput={onInput}
        input
      />
    </Example>
  );
}
