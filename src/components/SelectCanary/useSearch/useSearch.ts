import { useMemo, useState } from 'react';

import { defaultGetItemLabel } from '##/components/SelectCanary';
import { useDebounce } from '##/hooks/useDebounce';

type SelectItemDefault = {
  label: string;
};

export type UseSearchPropSearch<ITEM> = (
  item: ITEM,
  searchValue: string,
) => boolean;

type UseSearchProps<ITEM = SelectItemDefault> = {
  items: ITEM[];
  search?: UseSearchPropSearch<ITEM>;
  labelForNotFound?: string;
  debounceTimeOut?: number;
} & (ITEM extends { label: SelectItemDefault['label'] }
  ? {}
  : { search: UseSearchPropSearch<ITEM> });

export const getSearchFunctionDefault = <ITEM>(
  comparison: (item: ITEM) => string,
) => {
  return (item: ITEM, searchValue: string) =>
    comparison(item)
      .toLocaleLowerCase()
      .indexOf(searchValue.toLocaleLowerCase()) !== -1;
};

const searchDefault = getSearchFunctionDefault(defaultGetItemLabel);

const defaultLabelForNotFound = 'Не найдено';

export const useSearch = <ITEM = SelectItemDefault>({
  items,
  search = searchDefault as unknown as UseSearchPropSearch<ITEM>,
  debounceTimeOut = 300,
  labelForNotFound = defaultLabelForNotFound,
}: UseSearchProps<ITEM>) => {
  const [inputState, setInputState] = useState('');
  const setInputStateDebounce = useDebounce(setInputState, debounceTimeOut);

  const filteredItems = useMemo(() => {
    if (!inputState) return items;
    return items.filter((item) => search(item, inputState));
  }, [inputState]);

  return {
    input: true,
    onInput: setInputStateDebounce,
    items: filteredItems,
    labelForEmptyItems: inputState ? labelForNotFound : undefined,
  };
};
