import { Example } from '@consta/stand';
import React from 'react';

import { Informer } from '../../../Informer';

export const InformerExampleBasic = () => (
  <Example col={1}>
    <Informer
      view="filled"
      title="Это заголовок сообщения"
      label="А это текст сообщения — важная информация, которую можно показать в информере."
    />
  </Example>
);
