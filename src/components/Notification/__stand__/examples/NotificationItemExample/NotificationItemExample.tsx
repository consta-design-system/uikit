import { IconCrown } from '@consta/icons/IconCrown';
import { Example } from '@consta/stand';
import React from 'react';

import { NotificationItem } from '../../..';

export const NotificationItemExample = () => {
  return (
    <Example>
      <NotificationItem
        title="Заголовок сообщения"
        read={false}
        content="Содержимое сообщения"
        caption="Подпись сообщения"
        userName="Имя Пользователя"
        actions={[
          {
            label: 'Действие  1',
            icon: IconCrown,
          },
          {
            label: 'Действие  2',
            icon: IconCrown,
          },
        ]}
      />
    </Example>
  );
};
