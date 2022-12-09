import { Example } from '@consta/stand';
import React from 'react';

import { IconThumbUp } from '../../../../../icons/IconThumbUp/IconThumbUp';
import { IconTie } from '../../../../../icons/IconTie/IconTie';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { Informer } from '../../../Informer';

export function InformerExampleIcon() {
  return (
    <Example col={{ 1: 0, 2: 720 }}>
      <>
        <Informer
          label="Вы вошли без галстука"
          view="bordered"
          status="alert"
          icon={IconTie}
        />
        <p className={cnDocsExample('Status', { view: 'wrong' })}>
          Неправильно
        </p>
        <p className={cnDocsExample('Caption')}>
          Здесь уже есть один графический элемент — цветная полоска слева.
          Иконка не нужна
        </p>
      </>
      <>
        <Informer
          label="Сообщение отправлено"
          view="filled"
          status="success"
          icon={IconThumbUp}
        />
        <p className={cnDocsExample('Status', { view: 'right' })}>Правильно</p>
        <p className={cnDocsExample('Caption')}>
          Здесь графический элемент не спорит с окружением
        </p>
      </>
    </Example>
  );
}
