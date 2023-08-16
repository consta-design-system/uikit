import { Example } from '@consta/stand';
import React, { useEffect, useMemo, useState } from 'react';

import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag';

import { AutoComplete } from '../../..';

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
  const [lenght, setLenght] = useState<number>(0);
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
    return new Array(lenght).fill(null).map((_, i) => ({
      label: `Опция ${i + 1}`,
      id: i,
    }));
  }, [lenght, searchValue]);

  useEffect(() => {
    if (isLoading) {
      setIsLoading.on();
      isLoadingOffDebounce();
    }
  }, [searchValue]);

  useEffect(() => {
    if (isStart) {
      setIsLoading.on();
    }

    const timeoutNumber = setTimeout(() => {
      if (isStart) {
        setLenght((state) => state + 100);
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

export const AutoCompleteExampleIsLoading = () => {
  const [value, setValue] = useState<string | null>();
  const [data, isLoading, onFocus] = useMockLoadData();

  return (
    <Example col={1}>
      <AutoComplete
        placeholder="Кликните по полю ввода, чтобы данные загрузились"
        items={data}
        value={value}
        onChange={setValue}
        onFocus={data.length ? undefined : onFocus}
        isLoading={isLoading}
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

export const AutoCompleteExampleOnScrollBottom = () => {
  const [value, setValue] = useState<string | null>(null);
  const [data, isLoading, onFocus] = useMockLoadData(value || '');

  return (
    <Example col={1}>
      <AutoComplete
        placeholder="Кликните по полю ввода, чтобы данные загрузились"
        items={data}
        value={value}
        onChange={setValue}
        onFocus={onFocus}
        isLoading={isLoading}
        virtualScroll
        onScrollToBottom={value ? undefined : onFocus}
        searchFunction={() => true}
      />
    </Example>
  );
};
