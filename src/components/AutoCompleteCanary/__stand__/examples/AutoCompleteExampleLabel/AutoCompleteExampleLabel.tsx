import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { FieldWrapper } from '##/components/FieldComponents';

import { AutoComplete } from '../../..';

const items: string[] = ['Первый', 'Второй', 'Третий'];

export const AutoCompleteExampleLabel = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Example col={1}>
      <FieldWrapper label="Введите значение" caption="Вводи не пожалеешь">
        <AutoComplete
          type="text"
          getItemLabel={(item) => item}
          value={value}
          items={items}
          onChange={setValue}
        />
      </FieldWrapper>
    </Example>
  );
};
