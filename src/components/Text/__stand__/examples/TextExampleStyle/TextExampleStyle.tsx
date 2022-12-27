import { Example } from '@consta/stand';
import React from 'react';

import { Text, textPropFontStyle } from '../../../Text';

export const TextExampleStyle = () => {
  return (
    <Example
      col={{ 1: 0 }}
      separately
      items={textPropFontStyle.map((fontStyle) => ({
        label: `fontStyle="${fontStyle}"`,
        status: 'system',
        node: <Text fontStyle={fontStyle}>Просто текст</Text>,
      }))}
    />
  );
};
