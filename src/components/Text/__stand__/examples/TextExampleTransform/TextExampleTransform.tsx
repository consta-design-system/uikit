import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropTransform } from '../../../Text';

export const TextExampleTransform = () => {
  return (
    <Example
      col={{ 1: 0 }}
      separately
      items={textPropTransform.map((transform) => ({
        label: `transform="${transform}"`,
        status: 'system',
        node: <Text transform={transform}>Просто текст</Text>,
      }))}
    />
  );
};
