import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropSpacing } from '../../../Text';

export const TextExampleSpacing = () => {
  return (
    <Example
      col={{ 1: 0, 2: 800 }}
      separately
      items={textPropSpacing.map((spacing) => ({
        label: `spacing="${spacing}"`,
        status: 'system',
        node: (
          <Text spacing={spacing}>
            Съешь ещё этих мягких французских булок, да выпей же чаю.
          </Text>
        ),
      }))}
    />
  );
};
