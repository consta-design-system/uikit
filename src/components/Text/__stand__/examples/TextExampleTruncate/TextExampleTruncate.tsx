import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../Text';

export const TextExampleTruncate = () => {
  return (
    <Example>
      <div style={{ width: '300px' }}>
        <Text truncate>
          Очень длинный текст, который должен располагаться на одной строке и не
          влезает в родительский контейнер.
        </Text>
      </div>
    </Example>
  );
};
