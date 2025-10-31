import { Example } from '@consta/stand';
import React from 'react';

import {
  actions,
  items,
  itemsBadges,
  itemsBasic,
  itemsView,
} from '../../../__mocks__/data.mock';
import { NotificationsList } from '../../../NotificationsList';

export const NotificationsListExample = () => (
  <Example>
    <NotificationsList
      items={items}
      title="Уведомления"
      actions={actions}
      groupByDay
    />
  </Example>
);

export const NotificationsListExampleBasic = () => (
  <Example>
    <NotificationsList
      items={itemsBasic}
      title="Уведомления о действиях с забором"
    />
  </Example>
);

export const NotificationsListExampleBadges = () => (
  <Example>
    <NotificationsList
      items={itemsBadges}
      title="Уведомления о действиях с забором"
    />
  </Example>
);

export const NotificationsListExampleView = () => (
  <Example>
    <NotificationsList
      items={itemsView}
      title="Уведомления о действиях с забором"
    />
  </Example>
);
