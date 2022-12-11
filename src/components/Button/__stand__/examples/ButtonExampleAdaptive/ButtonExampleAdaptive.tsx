import { Example } from '@consta/stand';
import React from 'react';

import { Button } from '../../../Button';

export const ButtonExampleAdaptive = () => {
  return (
    <Example col={1}>
      {[200, 150, 50].map((maxWidth) => (
        <Button
          key={maxWidth}
          style={{ maxWidth }}
          label="Этот текст не помещается"
        />
      ))}
    </Example>
  );
};
