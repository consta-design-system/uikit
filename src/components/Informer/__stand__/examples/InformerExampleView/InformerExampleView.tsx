import { Example } from '@consta/stand';
import React from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';

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
        <p>
          Такой лучше использовать, когда сообщение — часть контента и находится
          на одном уровне с ним.
        </p>
      </>
      <>
        <Informer
          label="Всё заполнено"
          view="outline"
          status="success"
          className={cnMixSpace({ mB: 'm' })}
        />
        <p>
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
        <p>А такой — когда сообщение должно быть на уровень выше контента.</p>
      </>
    </Example>
  );
}
