import './UseDebounceExample.css';

import React, { useEffect, useState } from 'react';

import { Text } from '../../../../../components/Text/Text';
import { TextField } from '../../../../../components/TextField/TextField';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { useDebounce } from '../../../useDebounce';

const cnUseDebounceExample = cn('UseDebounceExample');

export const UseDebounceExample = () => {
  const [value, setValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const debounceSetSearchValue = useDebounce(setSearchValue, 300);

  useEffect(() => debounceSetSearchValue(value), [value]);

  return (
    <div className={cnDocsDecorator('Section', [cnUseDebounceExample()])}>
      <TextField
        className={cnUseDebounceExample('SearchField')}
        value={value}
        onChange={({ value }) => setValue(value)}
        placeholder="Поиск"
      />
      <Text className={cnUseDebounceExample('SearchField')}>
        Покажем результаты поиска по этому фрагменту: <b>{searchValue}</b>
      </Text>
    </div>
  );
};
