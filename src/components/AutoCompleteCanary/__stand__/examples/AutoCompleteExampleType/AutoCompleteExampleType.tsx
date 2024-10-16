import { Example } from '@consta/stand';
import React, { useCallback, useState } from 'react';

import { AutoComplete, AutoCompletePropOnChange } from '../../..';
import { getMailItems } from '../../../__mocks__/data.mock';

type Item = {
  label: string;
  id: number;
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
];
export const AutoCompleteExampleType = () => {
  const [value, setValue] = useState<string[] | null>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);

  const handleChange: AutoCompletePropOnChange<'textarray'> = useCallback(
    (value) => {
      setValue(value);
      setInputValue(null);
    },
    [],
  );

  return (
    <Example col={1}>
      <AutoComplete
        type="textarray"
        value={value}
        items={items}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onChange={handleChange}
      />
    </Example>
  );
};

export const AutoCompleteExampleTypeEmail = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={1}>
      <AutoComplete
        type="email"
        value={value}
        items={getMailItems(value)}
        onChange={setValue}
      />
    </Example>
  );
};

export const AutoCompleteExampleTypeEmailArray = () => {
  const [value, setValue] = useState<string[] | null>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);

  const handleChange: AutoCompletePropOnChange<'textarray'> = useCallback(
    (value) => {
      setValue(value);
      setInputValue(null);
    },
    [],
  );

  return (
    <Example col={1}>
      <AutoComplete
        type="textarray"
        value={value}
        items={getMailItems(inputValue)}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onChange={handleChange}
      />
    </Example>
  );
};
