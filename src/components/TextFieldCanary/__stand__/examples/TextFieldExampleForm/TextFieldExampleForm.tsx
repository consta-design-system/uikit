import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '../../../../Button/Button';
import { TextField } from '../../../TextField';

export const TextFieldExampleFormBasic = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <TextField
        placeholder="Форма default"
        value={value}
        onChange={setValue}
      />
      <TextField
        form="brick"
        placeholder="Форма brick"
        value={value}
        onChange={setValue}
      />
      <TextField
        form="round"
        placeholder="Форма round"
        value={value}
        onChange={setValue}
      />
    </Example>
  );
};

export function TextFieldExampleFormHybrid() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example col={1}>
      <div>
        <TextField
          placeholder="Электронная почта"
          form="roundClear"
          value={value}
          onChange={setValue}
          style={{ width: '260px' }}
        />
        <Button form="brickRound" label="Подписаться" />
      </div>
    </Example>
  );
}
