import { Example } from '@consta/stand';
import React from 'react';

import { Text } from '../../../Text';

export const TextExampleCursor = () => {
  return (
    <Example>
      <>
        <Text>Это текст с обычным текстовым курсором</Text>
        <Text cursor="pointer">Это текст с курсором-указателем</Text>
      </>
    </Example>
  );
};
