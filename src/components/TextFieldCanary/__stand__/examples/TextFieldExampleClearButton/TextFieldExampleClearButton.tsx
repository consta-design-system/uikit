import { Example } from '@consta/stand';
import React from 'react';

import { TextField } from '../../../TextFieldCanary';

export const TextFieldExampleClearButton = () => {
  return (
    <Example col={1}>
      <TextField defaultValue="Очисти меня" clearButton />
    </Example>
  );
};
