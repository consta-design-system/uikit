import { IconEye } from '@consta/icons/IconEye';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React from 'react';

import { NotificationItem } from '##/components/Notification/NotificationItem';
// import Image from '##/images/Arhayka.image.jpeg';

export const NotificationItemExampleAction = () => {
  return (
    <Example>
      <NotificationItem
        title="Иванов Иван Иванович"
        description="Принёс краску"
        // imageUrl={Image}
        actions={[
          {
            label: 'Удалить',
            icon: IconTrash,
          },
          {
            label: 'Отметить как прочитанное',
            icon: IconEye,
          },
        ]}
      />
    </Example>
  );
};
