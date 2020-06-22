import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import * as wp from '../../../../../utils/whitepaper/whitepaper';
import { Button } from '../../../Button';

const cnExample = cn('Example');

export function ButtonExampleSizeBasic() {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1-1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnExample()}>
        <Button label="Размер L" size="l" />
      </div>
      <div className={cnExample()}>
        <Button label="Размер M" size="m" />
      </div>
      <div className={cnExample()}>
        <Button label="Размер S" size="s" />
      </div>
      <div className={cnExample()}>
        <Button label="Размер XS" size="xs" />
      </div>
    </div>
  );
}

export function ButtonExampleSizeFull() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <div className={cnExample()}>
        <Button width="full" label="Отправить" />
      </div>
    </div>
  );
}
