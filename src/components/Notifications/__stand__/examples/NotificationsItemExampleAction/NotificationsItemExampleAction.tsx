import { IconEye } from '@consta/icons/IconEye';
import { IconTrash } from '@consta/icons/IconTrash';
import { Example } from '@consta/stand';
import React from 'react';

import { NotificationsItem } from '##/components/Notifications/NotificationsItem';
// import Image from '##/images/Arhayka.image.jpeg';

export const NotificationsItemExampleAction = () => {
  return (
    <Example>
      <NotificationsItem
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
