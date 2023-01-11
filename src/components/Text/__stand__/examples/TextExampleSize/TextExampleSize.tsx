import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropSize } from '../../../Text';

export const TextExampleSize = () => {
  return (
    <Example
      col={{ 1: 0, flex: 800 }}
      separately
      items={textPropSize.map((size) => ({
        label: `size="${size}"`,
        status: 'system',
        node: <Text size={size}>Просто текст</Text>,
      }))}
    />
  );
};
