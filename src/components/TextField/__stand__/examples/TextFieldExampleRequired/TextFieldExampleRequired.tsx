import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleRequired = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField
        label="Поле раз"
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Обязательное"
        required
      />
      <TextField
        label="Поле два"
        onChange={handleChange}
        value={value}
        type="text"
        placeholder="Необязательное"
      />
    </Example>
  );
};
