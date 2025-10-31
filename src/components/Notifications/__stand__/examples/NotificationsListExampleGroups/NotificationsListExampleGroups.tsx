import { Example } from '@consta/stand';
import React from 'react';

import { groups, itemsDate, itemsGroups } from '../../../__mocks__/data.mock';
import { NotificationsList } from '../../../NotificationsList';

export const NotificationsListExampleDate = () => (
  <Example>
    <NotificationsList items={itemsDate} groupByDay title="Уведомления" />
  </Example>
);

export const NotificationsListExampleGroups = () => (
  <Example>
    <NotificationsList
      items={itemsGroups}
      groups={groups}
      title="Уведомления"
    />
  </Example>
);
