import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { TextField } from '../../../TextField';

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

export const TextFieldExampleSizeRows = () => {
  const [value, setValue] = useState<string | null>(
    'Я иду и пою обо всем хорошем и улыбку свою я дарю прохожим',
  );

  return (
    <Example col={1}>
      <TextField
        type="textarea"
        rows={7}
        cols={50}
        onChange={setValue}
        value={value}
      />
    </Example>
  );
};

export const TextFieldExampleSizeMinRows = () => {
  const [value, setValue] = useState<string | null>(
    'Я иду и пою обо всем хорошем и улыбку свою я дарю прохожим',
  );

  return (
    <Example col={1}>
      <TextField
        type="textarea"
        minRows={13}
        cols={25}
        onChange={setValue}
        value={value}
      />
    </Example>
  );
};
