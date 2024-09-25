import { Example } from '@consta/stand';
import React from 'react';

import { TextField } from '../../../TextField';

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
