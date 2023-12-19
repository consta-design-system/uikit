import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

export const TextFieldExampleIncrementButtons = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        onChange={setValue}
        value={value}
        type="number"
        incrementButtons={false}
      />
    </Example>
  );
};
