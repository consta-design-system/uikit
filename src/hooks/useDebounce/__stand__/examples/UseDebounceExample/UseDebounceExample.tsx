import './UseDebounceExample.css';

import { Example } from '@consta/stand';
import React, { useEffect, useState } from 'react';

import { Text } from '../../../../../components/Text/Text';
import { TextField } from '../../../../../components/TextField/TextField';
import { cn } from '../../../../../utils/bem';
import { useDebounce } from '../../../useDebounce';

const cnUseDebounceExample = cn('UseDebounceExample');

export const UseDebounceExample = () => {
  const [value, setValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const debounceSetSearchValue = useDebounce(setSearchValue, 300);

  useEffect(() => debounceSetSearchValue(value), [value]);

  return (
    <Example>
      <>
        <TextField
          className={cnUseDebounceExample('SearchField')}
          value={value}
          onChange={({ value }) => setValue(value)}
          placeholder="Поиск"
        />
        <Text
          view="primary"
          size="m"
          lineHeight="m"
          className={cnUseDebounceExample('SearchField')}
        >
          Покажем результаты поиска по этому фрагменту: <b>{searchValue}</b>
        </Text>
      </>
    </Example>
  );
};
