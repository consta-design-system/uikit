import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropFont } from '../../../Text';

export const TextExampleFont = () => {
  return (
    <Example
      col={{ 1: 0, 2: 400 }}
      separately
      items={textPropFont.map((font) => ({
        label: `font="${font}"`,
        status: 'system',
        node: <Text font={font}>Просто текст</Text>,
      }))}
    />
  );
};
