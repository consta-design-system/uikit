import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropWeight } from '../../../Text';

export const TextExampleWeight = () => {
  return (
    <Example
      col={{ 1: 0, 2: 400, 3: 600, 4: 800 }}
      separately
      items={textPropWeight.map((weight) => ({
        label: `weight="${weight}"`,
        status: 'system',
        node: (
          <Text size="l" weight={weight}>
            Просто текст
          </Text>
        ),
      }))}
    />
  );
};
