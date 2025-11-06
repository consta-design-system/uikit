import { Example } from '@consta/stand';
import React from 'react';

import { Notification } from '##/components/Notification';
import { cn } from '##/utils/bem';

import { actions, items } from '../../../__mocks__/data.mock';

const cnNotificationStories = cn('NotificationStories');

export const NotificationExample = () => (
  <Example>
    <Notification
      listClassName={cnNotificationStories('List')}
      items={items}
      title="Уведомления"
      actions={actions}
      groupByDay
    />
  </Example>
);
