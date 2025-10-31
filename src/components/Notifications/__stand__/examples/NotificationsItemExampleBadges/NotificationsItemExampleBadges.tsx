import { Example } from '@consta/stand';
import React from 'react';

import { NotificationsItem } from '##/components/Notifications/NotificationsItem';
// import Image from '##/images/Gizeasy.image.jpeg';

export const NotificationsItemExampleBadges = () => {
  return (
    <Example>
      <NotificationsItem
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
