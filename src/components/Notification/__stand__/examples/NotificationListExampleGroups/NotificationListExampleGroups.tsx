import { Example } from '@consta/stand';
import React from 'react';

import { groups, itemsDate, itemsGroups } from '../../../__mocks__/data.mock';
import { NotificationList } from '../../../NotificationList';

export const NotificationListExampleDate = () => (
  <Example>
    <NotificationList items={itemsDate} groupByDay title="Уведомления" />
  </Example>
);

export const NotificationListExampleGroups = () => (
  <Example>
    <NotificationList items={itemsGroups} groups={groups} title="Уведомления" />
  </Example>
);
