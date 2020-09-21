import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Button } from '../../../Button';

export function ButtonExampleSizeBasic() {
  return (
    <div
      className={cnDocsDecorator('Section', [
        wp.tplGrid({ 'ratio': '1-1-1-1', 'col-gap': 'full' }),
      ])}
    >
      <div className={cnDocsExample()}>
        <Button label="Размер XS" size="xs" />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Размер S" size="s" />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Размер M" size="m" />
      </div>
      <div className={cnDocsExample()}>
        <Button label="Размер L" size="l" />
      </div>
    </div>
  );
}

export function ButtonExampleSizeFull() {
  return (
    <div className={cnDocsDecorator('Section')}>
      <div className={cnDocsExample()}>
        <Button width="full" label="Отправить" />
      </div>
    </div>
  );
}
