import { IconCrown } from '@consta/icons/IconCrown';
import { Example } from '@consta/stand';
import React from 'react';

import { NotificationActions } from '../../..';

export const NotificationActionsExample = () => {
  return (
    <Example>
      <NotificationActions
        items={[
          {
            label: 'Action 1',
            icon: IconCrown,
          },
        ]}
      />
      <NotificationActions
        items={[
          {
            label: 'Action 1',
            icon: IconCrown,
          },
        ]}
        onlyIcon
      />
      <NotificationActions
        items={[
          {
            label: 'Action 1',
            icon: IconCrown,
            onClick: () => console.log('Action e1'),
          },
          {
            label: 'Action 2',
            icon: IconCrown,
          },
        ]}
      />
    </Example>
  );
};
