import { Example } from '@consta/stand';
import React from 'react';

import {
  actions,
  items,
  itemsBadges,
  itemsBasic,
  itemsView,
} from '../../../__mocks__/data.mock';
import { NotificationList } from '../../../NotificationList';

export const NotificationListExample = () => (
  <Example>
    <NotificationList
      items={items}
      title="Уведомления"
      actions={actions}
      groupByDay
    />
  </Example>
);

export const NotificationListExampleBasic = () => (
  <Example>
    <NotificationList
      items={itemsBasic}
      title="Уведомления о действиях с забором"
    />
  </Example>
);

export const NotificationListExampleBadges = () => (
  <Example>
    <NotificationList
      items={itemsBadges}
      title="Уведомления о действиях с забором"
    />
  </Example>
);

export const NotificationListExampleView = () => (
  <Example>
    <NotificationList
      items={itemsView}
      title="Уведомления о действиях с забором"
    />
  </Example>
);
