import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropView } from '../../../Text';

export const TextExampleView = () => {
  return (
    <Example
      col={{ 1: 0, 2: 400, 3: 600, 4: 800 }}
      separately
      items={textPropView.map((view) => ({
        label: `view="${view}"`,
        status: 'system',
        node: (
          <Text size="l" view={view}>
            Просто текст
          </Text>
        ),
      }))}
    />
  );
};
