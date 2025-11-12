import './NotificationGroup.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { NotificationGroupProps } from './types';

const cnNotificationGroup = cn('NotificationGroup');

export const NotificationGroup: React.FC<NotificationGroupProps> = forwardRef<
  HTMLDivElement,
  NotificationGroupProps
>(({ label }) => {
  return (
    <Text
      className={cnNotificationGroup('GroupLabel', [
        cnMixSpace({
          pV: '2xs',
          pH: 'xl',
        }),
      ])}
      view="secondary"
      transform="uppercase"
      weight="bold"
      size="2xs"
      lineHeight="m"
    >
      {label}
    </Text>
  );
});
