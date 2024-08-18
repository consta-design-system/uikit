import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleTypeText = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        onChange={setValue}
        value={value}
        type="text"
        placeholder="Одна строчка"
      />
    </Example>
  );
};

export const TextFieldExampleTypeTextarea = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        onChange={setValue}
        value={value}
        type="textarea"
        cols={200}
        rows={3}
        placeholder="Несколько строчек"
      />
    </Example>
  );
};

export const TextFieldExampleTypeNumber = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        onChange={setValue}
        value={value}
        type="number"
        step="2"
        placeholder="Здесь цифры"
      />
    </Example>
  );
};

export const TextFieldExampleTypePassword = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        onChange={setValue}
        value={value}
        type="password"
        placeholder="Пароль"
      />
    </Example>
  );
};
