import './NotificationGroup.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

import { NotificationActions } from '../NotificationActions';
import { NotificationGroupProps } from './types';

const cnNotificationGroup = cn('NotificationGroup');

export const NotificationGroup: React.FC<NotificationGroupProps> = forwardRef<
  HTMLDivElement,
  NotificationGroupProps
>(({ title, actions, className, ...otherProps }, ref) => {
  if (!title) {
    return null;
  }

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnNotificationGroup(null, [
        className,
        cnMixFlex({ gap: 'xs' }),
      ])}
    >
      <Text
        className={cnNotificationGroup('Label', [
          cnMixFlex({ align: 'center' }),
        ])}
        view="secondary"
        transform="uppercase"
        weight="semibold"
        size="xs"
        lineHeight="m"
        fontStyle="italic"
      >
        {title}
      </Text>

      {actions?.length && <NotificationActions items={actions} />}
    </div>
  );
});
