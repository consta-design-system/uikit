import { Example } from '@consta/stand';
import React from 'react';

import { Informer } from '../../../Informer';

export const InformerExampleSuccess = () => (
  <Example col={1}>
    <Informer
      status="success"
      view="filled"
      title="Заявка отправлена"
      label="Подождите до завтра: мы всё посчитаем и вам позвоним"
    />
  </Example>
);

export const InformerExampleAlert = () => (
  <Example col={1}>
    <Informer
      status="alert"
      view="filled"
      title="Ничего не вышло"
      label="Попробуйте выйти и зайти снова. Если не получается, нажмите красную кнопку три раза"
    />
  </Example>
);
