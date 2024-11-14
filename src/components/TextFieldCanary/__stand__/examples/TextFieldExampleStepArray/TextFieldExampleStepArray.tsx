import { Example } from '@consta/stand';
import React from 'react';

import { TextField } from '../../../TextFieldCanary';

export const TextFieldExampleStepArray = () => {
  return (
    <Example col={1}>
      <TextField
        type="number"
        step={[10, 50, 80]}
        min="0"
        max="100"
        incrementButtons
        defaultValue="10"
        placeholder="Здесь только 0, 10, 50, 80, 100"
      />
    </Example>
  );
};
