import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text } from '../../../Text';

export const TextExampleEllipsis = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'm' })}>
        test_ellipsis
      </Text>
      <div style={{ width: '300px' }}>
        <Text ellipsis>
          Очень длинный текст, который должен располагаться в одну строку и быть ограничен
          родительским контейнером.
        </Text>
      </div>
    </div>
  );
};
