import { Example } from '@consta/stand';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag';

import { UserSelect } from '../../..';

type Item = {
  label: string;
  id: number;
};

const useMockLoadData = (
  searchValue = '',
  timeout = 2000,
): [Item[], boolean, () => void] => {
  const [isLoading, setIsLoading] = useFlag();
  const [isStart, setIsStart] = useFlag();
  const [length, setLength] = useState<number>(0);
  const isLoadingOffDebounce = useDebounce(setIsLoading.off, 2000);

  const items = useMemo(() => {
    if (searchValue) {
      return new Array(10000)
        .fill(null)
        .map((_, i) => ({
          label: `Опция ${i + 1}`,
          id: i,
        }))
        .filter(
          (item) =>
            item.label
              .toLocaleLowerCase()
              .indexOf(searchValue.toLocaleLowerCase()) !== -1,
        );
    }
    return new Array(length).fill(null).map((_, i) => ({
      label: `Опция ${i + 1}`,
      id: i,
    }));
  }, [length, searchValue]);

  useEffect(() => {
    setIsLoading.on();
    isLoadingOffDebounce();
  }, [searchValue]);

  useEffect(() => {
    if (isStart) {
      setIsLoading.on();
    }

    const timeoutNumber = setTimeout(() => {
      if (isStart) {
        setLength((state) => state + 100);
        setIsLoading.off();
        setIsStart.off();
      }
    }, timeout);

    return () => {
      clearTimeout(timeoutNumber);
    };
  }, [isStart]);

  useEffect(() => {
    return () => {
      setIsLoading.off();
      setIsStart.off();
    };
  }, []);

  return [searchValue && isLoading ? [] : items, isLoading, setIsStart.on];
};

export const UserSelectExampleIsLoading = () => {
  const [value, setValue] = useState<Item[] | null>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [data, isLoading, load] = useMockLoadData(searchValue);
  const onDropdownOpen = useCallback((open: boolean) => {
    open && load();
  }, []);

  return (
    <Example col={1}>
      <UserSelect
        placeholder="Кликните по полю ввода, чтобы данные загрузились"
        items={data}
        value={value}
        onChange={setValue}
        multiple
        onDropdownOpen={onDropdownOpen}
        isLoading={isLoading}
        virtualScroll
        onScrollToBottom={searchValue ? undefined : load}
        searchFunction={() => true}
        onSearchValueChange={setSearchValue}
      />
    </Example>
  );
};
