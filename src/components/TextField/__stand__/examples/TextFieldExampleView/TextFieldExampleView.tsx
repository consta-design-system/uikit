import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleView = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        view="default"
        placeholder="Самое обычное поле"
        value={value}
        onChange={setValue}
      />
      <TextField
        view="clear"
        placeholder="Незаметное поле"
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};

export const TextFieldExampleViewDisabled = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        placeholder="Неактивное поле"
        disabled
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};
