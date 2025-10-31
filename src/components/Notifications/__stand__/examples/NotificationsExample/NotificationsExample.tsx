import { Example } from '@consta/stand';
import React from 'react';

import { Notifications } from '##/components/Notifications';
import { cn } from '##/utils/bem';

import { actions, items } from '../../../__mocks__/data.mock';

const cnNotificationsStories = cn('NotificationsStories');

export const NotificationsExample = () => (
  <Example>
    <Notifications
      listClassName={cnNotificationsStories('List')}
      items={items}
      title="Уведомления"
      actions={actions}
      groupByDay
    />
  </Example>
);
