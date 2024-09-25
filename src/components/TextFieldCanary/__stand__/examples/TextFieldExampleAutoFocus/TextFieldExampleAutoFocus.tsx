import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button';

import { TextField } from '../../../TextField';

export const TextFieldExampleAutoFocus = () => {
  return (
    <Example col={1}>
      <TextField autoFocus />
    </Example>
  );
};

export const TextFieldExampleProgramFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Example col={1}>
      <TextField inputRef={inputRef} />
      <Button
        label="Тык"
        onClick={() => {
          inputRef.current?.focus();
        }}
      />
    </Example>
  );
};
