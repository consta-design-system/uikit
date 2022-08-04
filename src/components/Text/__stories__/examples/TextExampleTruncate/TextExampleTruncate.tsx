import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Text } from '../../../Text';

export const TextExampleTruncate = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <div style={{ width: '300px' }}>
        <Text truncate>
          Очень длинный текст, который должен располагаться на одной строке и не
          влезает в родительский контейнер.
        </Text>
      </div>
    </div>
  );
};
