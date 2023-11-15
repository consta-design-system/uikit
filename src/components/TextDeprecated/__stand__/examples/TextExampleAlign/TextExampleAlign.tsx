import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropAlign } from '../../../TextDeprecated';

export const TextExampleAlign = () => {
  return (
    <Example
      col={{ 1: 0, 3: 600 }}
      separately
      items={textPropAlign.map((align) => ({
        label: `align="${align}"`,
        status: 'system',
        node: <Text align={align}>Просто текст</Text>,
      }))}
    />
  );
};
