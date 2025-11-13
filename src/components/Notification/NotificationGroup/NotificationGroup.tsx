import './NotificationGroup.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { NotificationActions } from '../NotificationActions';
import { NotificationGroupProps } from './types';

const cnNotificationGroup = cn('NotificationGroup');

export const NotificationGroup: React.FC<NotificationGroupProps> = forwardRef<
  HTMLDivElement,
  NotificationGroupProps
>(({ label, actions }) => {
  return (
    <div
      className={cnNotificationGroup(null, [
        cnMixSpace({
          pV: 'xs',
          pH: 'm',
        }),
        cnMixFlex({ justify: 'space-between', align: 'center', gap: 'xs' }),
      ])}
    >
      <Text
        className={cnNotificationGroup('Label')}
        view="secondary"
        transform="uppercase"
        weight="semibold"
        size="xs"
        lineHeight="m"
        fontStyle="italic"
      >
        {label}
      </Text>
      <NotificationActions items={actions} />
    </div>
  );
});
