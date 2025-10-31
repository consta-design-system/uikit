import { Example } from '@consta/stand';
import React from 'react';

import { actions, itemsBasic } from '../../../__mocks__/data.mock';
import { NotificationsList } from '../../../NotificationsList';

export const NotificationsListExampleActions = () => (
  <Example
    style={{
      width: '400px',
    }}
  >
    <NotificationsList
      items={itemsBasic}
      actions={actions}
      title="Уведомления"
      style={{
        zIndex: 1,
      }}
    />
  </Example>
);
