import { IconCrown } from '@consta/icons/IconCrown';
import { Example } from '@consta/stand';
import React from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';

import { NotificationGroup } from '../../..';

export const NotificationGroupExample = () => {
  return (
    <Example>
      <NotificationGroup
        title="Заголовок уведомления"
        className={cnMixSpace({ pV: 'xs', pH: 's' })}
        actions={[
          {
            label: 'Действие 1',
            icon: IconCrown,
          },
          {
            label: 'Действие 2',
            icon: IconCrown,
          },
        ]}
      />
    </Example>
  );
};
