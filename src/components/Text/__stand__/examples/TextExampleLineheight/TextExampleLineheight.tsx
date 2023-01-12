import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropLineHeight } from '../../../Text';

export const TextExampleLineheight = () => {
  return (
    <Example
      col={{ 1: 0, 2: 600, 3: 800 }}
      separately
      items={textPropLineHeight.map((lineHeight) => ({
        label: `lineHeight="${lineHeight}"`,
        status: 'system',
        node: (
          <Text lineHeight={lineHeight}>
            Съешь ещё этих мягких французских булок, да выпей же чаю.
          </Text>
        ),
      }))}
    />
  );
};
