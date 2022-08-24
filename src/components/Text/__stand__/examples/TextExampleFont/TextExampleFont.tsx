import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Text } from '../../../Text';

export const TextExampleFont = () => {
  return (
    <>
      <div className={cnDocsDecorator('Section')}>
        <Text
          size="s"
          view="ghost"
          className={wp.decorator({ 'indent-b': 'm' })}
        >
          font=&quot;primary&quot;
        </Text>
        <Text font="primary">Просто текст</Text>
      </div>
      <div className={cnDocsDecorator('Section')}>
        <Text
          size="s"
          view="ghost"
          className={wp.decorator({ 'indent-b': 'm' })}
        >
          font=&quot;mono&quot;
        </Text>
        <Text font="mono">Просто текст</Text>
      </div>
    </>
  );
};
