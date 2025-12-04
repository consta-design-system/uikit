import { IconCrown } from '@consta/icons/IconCrown';
import { Example } from '@consta/stand';
import React from 'react';

import { NotificationHeader } from '../../..';

export const NotificationHeaderExample = () => {
  return (
    <Example>
      <NotificationHeader
        title="Заголовок уведомления"
        onClose={() => console.log('onClose')}
        actions={[
          {
            label: 'Действие 1',
            icon: IconCrown,
          },
          {
            label: 'Действие 2',
            icon: IconCrown,
          },
        ]}
      />
    </Example>
  );
};
