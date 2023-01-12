import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropDecoration } from '../../../Text';

export const TextExampleDecoration = () => {
  return (
    <Example
      col={{ 1: 0 }}
      separately
      items={textPropDecoration.map((decoration) => ({
        label: `decoration="${decoration}"`,
        status: 'system',
        node: <Text decoration={decoration}>Просто текст</Text>,
      }))}
    />
  );
};
