import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextFieldCanary';

export const TextFieldExampleTypeText = () => {
  return (
    <Example col={1}>
      <TextField type="text" placeholder="Одна строчка" />
    </Example>
  );
};

export const TextFieldExampleTypeTextarea = () => {
  return (
    <Example col={1}>
      <TextField type="textarea" rows={3} placeholder="Несколько строчек" />
    </Example>
  );
};

export const TextFieldExampleTypeNumber = () => {
  return (
    <Example col={1}>
      <TextField type="number" placeholder="Здесь цифры" />
    </Example>
  );
};

export const TextFieldExampleTypePassword = () => {
  return (
    <Example col={1}>
      <TextField type="password" placeholder="Пароль" />
    </Example>
  );
};

export const TextFieldExampleTypeTextArray = () => {
  const [value, setValue] = useState<string[] | null>(null);
  const [stringValue, setStringValue] = useState<string | null>(null);

  const onChange = (value: string[] | null) => {
    setStringValue(null);
    setValue(value);
  };

  return (
    <Example col={1}>
      <TextField
        placeholder="Введите текст и нажмите Enter"
        value={value}
        onChange={onChange}
        type="textarray"
        clearButton
        inputValue={stringValue}
        onInputChange={setStringValue}
      />
    </Example>
  );
};
