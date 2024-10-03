import { Example } from '@consta/stand';
import React from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleResizeTrue = () => {
  return (
    <Example col={1}>
      <TextField
        type="textarea"
        rows={3}
        placeholder="Подергай за уголок"
        resize
      />
    </Example>
  );
};

export const TextFieldExampleResizeAuto = () => {
  return (
    <Example col={1}>
      <TextField
        type="textarea"
        minRows={3}
        maxRows={6}
        placeholder="Буду увеличиваться до 6ти строк"
        resize="auto"
      />
    </Example>
  );
};
