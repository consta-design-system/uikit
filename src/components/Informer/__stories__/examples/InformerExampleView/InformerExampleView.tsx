import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Informer } from '../../../Informer';

export function InformerExampleView() {
  return (
    <div
      className={cnDocsDecorator('Section', [wp.tplGrid({ 'ratio': '1-1', 'col-gap': 'full' })])}
    >
      <div className={cnDocsExample()}>
        <Informer label="Ваше сообщение отправлено" view="filled" status="success" />
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>
          Такой лучше использовать, когда сообщение — часть контента и находится на одном уровне с
          ним.
        </p>
      </div>
      <div className={cnDocsExample()}>
        <Informer label="Всё заполнено" view="bordered" status="success" />
      </div>
      <div className={cnDocsExample()}>
        <p className={cnDocsExample('Caption')}>
          А такой — когда сообщение должно быть на уровень выше контента.
        </p>
      </div>
    </div>
  );
}
