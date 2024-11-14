import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cnMixFlex } from '##/mixs/MixFlex';

import { Button } from '../../../../Button/Button';
import { TextField } from '../../../TextFieldCanary';

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
  return (
    <Example col={1}>
      <div className={cnMixFlex({ flex: 'flex', direction: 'row' })}>
        <TextField placeholder="Электронная почта" form="roundClear" />
        <Button form="brickRound" label="Подписаться" />
      </div>
    </Example>
  );
}
