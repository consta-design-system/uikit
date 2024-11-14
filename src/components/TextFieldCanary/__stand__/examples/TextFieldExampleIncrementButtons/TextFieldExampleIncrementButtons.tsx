import { Example } from '@consta/stand';
import React from 'react';

import { TextField } from '../../../TextFieldCanary';

export const TextFieldExampleIncrementButtons = () => {
  return (
    <Example col={1}>
      <TextField type="number" incrementButtons />
    </Example>
  );
};
