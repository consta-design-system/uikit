import { IconQuestion } from '@consta/icons/IconQuestion';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleLabel = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        onChange={setValue}
        value={value}
        placeholder="Здесь лейбл сверху"
        label="Лейбл"
        labelPosition="top"
      />
      <TextField
        onChange={setValue}
        value={value}
        placeholder="Здесь лейбл слева"
        label="Лейбл"
        labelPosition="left"
      />
    </Example>
  );
};

export const TextFieldExampleLabelIcon = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        onChange={setValue}
        value={value}
        labelIcon={IconQuestion}
        placeholder="Здесь лейбл сверху"
        label="Лейбл"
      />
    </Example>
  );
};
