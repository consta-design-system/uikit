import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Button } from '../../../Button';

const cnExample = cn('Example');

export function ButtonExampleLoading() {
  return (
    <div className={cnDocsDecorator('Section', [wp.decorator({ distribute: 'left' })])}>
      <div className={cnExample()}>
        <Button loading label="Загрузка" />
      </div>
    </div>
  );
}
