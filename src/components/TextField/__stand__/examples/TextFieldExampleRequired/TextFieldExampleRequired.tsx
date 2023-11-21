import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleRequired = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        label="Поле раз"
        onChange={setValue}
        value={value}
        type="text"
        placeholder="Обязательное"
        required
      />
      <TextField
        label="Поле два"
        onChange={setValue}
        value={value}
        type="text"
        placeholder="Необязательное"
      />
    </Example>
  );
};
