import { Example } from '@consta/stand';
import React from 'react';

import { NotificationsItem } from '##/components/Notifications/NotificationsItem';
// import Image from '##/images/Arhayka.image.jpeg';

const date = new Date(2021, 10, 12, 13, 57, 0);

export const NotificationsItemExampleBasic = () => {
  return (
    <Example>
      <NotificationsItem
        title="Заголовок"
        style={{
          minWidth: '400px',
        }}
        date={date}
        description="Описание"
        // imageUrl={Image}
      />
    </Example>
  );
};
