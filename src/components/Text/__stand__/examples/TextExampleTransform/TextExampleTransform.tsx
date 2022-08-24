import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text } from '../../../Text';

export const TextExampleTransform = () => {
  return (
    <div className={cnDocsDecorator('Section')}>
      <Text size="s" view="ghost" className={wp.decorator({ 'indent-b': 'm' })}>
        transform=&quot;uppercase&quot;
      </Text>
      <Text transform="uppercase">Просто текст</Text>
    </div>
  );
};
