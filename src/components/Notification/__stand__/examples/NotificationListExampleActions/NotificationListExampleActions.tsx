import { Example } from '@consta/stand';
import React from 'react';

import { actions, itemsBasic } from '../../../__mocks__/data.mock';
import { NotificationList } from '../../../NotificationList';

export const NotificationListExampleActions = () => (
  <Example
    style={{
      width: '400px',
    }}
  >
    <NotificationList
      items={itemsBasic}
      actions={actions}
      title="Уведомления"
      style={{
        zIndex: 1,
      }}
    />
  </Example>
);
