import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Text } from '../../../Text';

export const TextExampleCursor = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <Text>Это текст с обычным текстовым курсором</Text>
      <Text cursor="pointer">Это текст с курсором-указателем</Text>
    </div>
  );
};
