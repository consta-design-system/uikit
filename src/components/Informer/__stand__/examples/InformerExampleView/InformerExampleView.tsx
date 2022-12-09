import { Example } from '@consta/stand';
import React from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';

import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { Informer } from '../../../Informer';

export function InformerExampleView() {
  return (
    <Example col={1}>
      <>
        <Informer
          label="Ваше сообщение отправлено"
          view="filled"
          status="success"
          className={cnMixSpace({ mB: 'm' })}
        />
        <p className={cnDocsExample('Caption')}>
          Такой лучше использовать, когда сообщение — часть контента и находится
          на одном уровне с ним.
        </p>
      </>
      <>
        <Informer
          label="Всё заполнено"
          view="bordered"
          status="success"
          className={cnMixSpace({ mB: 'm' })}
        />
        <p className={cnDocsExample('Caption')}>
          А такой — когда сообщение должно быть на уровень выше контента.
        </p>
      </>
    </Example>
  );
}
