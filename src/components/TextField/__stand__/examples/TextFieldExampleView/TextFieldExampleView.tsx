import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleView = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField
        view="default"
        placeholder="Самое обычное поле"
        value={value}
        onChange={handleChange}
      />
      <TextField
        view="clear"
        placeholder="Незаметное поле"
        value={value}
        onChange={handleChange}
      />
    </Example>
  );
};

export const TextFieldExampleViewDisabled = () => {
  const [value, setValue] = useState<string | null>(null);
  const handleChange = ({ value }: { value: string | null }) => setValue(value);

  return (
    <Example col={1}>
      <TextField
        placeholder="Неактивное поле"
        disabled
        value={value}
        onChange={handleChange}
      />
    </Example>
  );
};
