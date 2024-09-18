import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleStatus = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        onChange={setValue}
        value={value}
        status="success"
        placeholder="Статус success"
      />
      <TextField
        onChange={setValue}
        value={value}
        status="alert"
        placeholder="Статус error"
      />
      <TextField
        onChange={setValue}
        value={value}
        status="warning"
        placeholder="Статус warning"
      />
      <TextField onChange={setValue} value={value} placeholder="Обычное поле" />
    </Example>
  );
};
