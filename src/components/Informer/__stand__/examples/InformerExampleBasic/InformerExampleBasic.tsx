import React from 'react';

import { Informer } from '../../../Informer';

export const InformerExampleBasic = () => (
  <Informer
    view="filled"
    title="Это заголовок сообщения"
    label="А это текст сообщения — важная информация, которую можно показать в информере."
  />
);
