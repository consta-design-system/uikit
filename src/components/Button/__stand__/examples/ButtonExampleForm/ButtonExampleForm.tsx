import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '##/components/Button';
import { TextField } from '##/components/TextField';

export const ButtonExampleFormBasic = () => {
  return (
    <Example col={{ 1: 0, flex: 600 }}>
      <Button label="Default" />
      <Button form="brick" label="Brick" />
      <Button form="round" label="Round" />
    </Example>
  );
};

export const ButtonExampleFormHybrid = () => {
  return (
    <Example>
      <div style={{ display: 'flex' }}>
        <TextField
          placeholder="Электронная почта"
          form="roundClear"
          style={{ width: '100%', maxWidth: '260px' }}
        />
        <Button form="brickRound" label="Подписаться" />
      </div>
    </Example>
  );
};
