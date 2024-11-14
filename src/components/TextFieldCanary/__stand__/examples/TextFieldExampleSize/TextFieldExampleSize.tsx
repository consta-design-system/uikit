import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextFieldCanary';

export const TextFieldExampleSize = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <div>
        <TextField
          size="xs"
          placeholder="Размер XS"
          onChange={setValue}
          value={value}
        />
      </div>
      <div>
        <TextField
          size="s"
          placeholder="Размер S"
          onChange={setValue}
          value={value}
        />
      </div>
      <div>
        <TextField
          size="m"
          placeholder="Размер M"
          onChange={setValue}
          value={value}
        />
      </div>
      <div>
        <TextField
          size="l"
          placeholder="Размер L"
          onChange={setValue}
          value={value}
        />
      </div>
    </Example>
  );
};
