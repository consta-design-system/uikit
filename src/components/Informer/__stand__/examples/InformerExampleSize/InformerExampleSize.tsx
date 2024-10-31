import { Example } from '@consta/stand';
import React from 'react';

import { Informer } from '../../../Informer';

export const InformerExampleSize = () => (
  <div>
    <Example col={1}>
      <Informer
        status="system"
        view="filled"
        title="Размер m"
        label="Это обычное сообщение с обычным размером"
        size="m"
      />
      <Informer
        status="system"
        view="filled"
        title="Размер s"
        label="Это сообщение поменьше"
        size="s"
      />
    </Example>
  </div>
);
