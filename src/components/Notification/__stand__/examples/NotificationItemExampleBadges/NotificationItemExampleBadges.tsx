import { Example } from '@consta/stand';
import React from 'react';

import { NotificationItem } from '##/components/Notification/NotificationItem';
// import Image from '##/images/Gizeasy.image.jpeg';

export const NotificationItemExampleBadges = () => {
  return (
    <Example>
      <NotificationItem
        title="Один человек"
        description="Принёс краску"
        // imageUrl={Image}
        badges={[
          {
            label: 'готов к работе',
            status: 'warning',
          },
          {
            label: 'горит',
            status: 'error',
          },
        ]}
      />
    </Example>
  );
};
