import './NotificationHeader.css';

import { IconClose } from '@consta/icons/IconClose';
import React, { forwardRef } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

import { NotificationActions } from '../NotificationActions';
import { NotificationHeaderProps } from './types';

export const cnNotificationHeader = cn('NotificationHeader');

export const NotificationHeader: React.FC<NotificationHeaderProps> = forwardRef<
  HTMLDivElement,
  NotificationHeaderProps
>(
  (
    { title, actions, className, onClose, scrollContainerRef, ...otherProps },
    ref,
  ) => {
    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnNotificationHeader(null, [
          className,
          cnMixFlex({ gap: 'xs' }),
        ])}
      >
        <Text
          className={cnNotificationHeader('Title')}
          view="secondary"
          transform="uppercase"
          weight="semibold"
          size="l"
          lineHeight="m"
        >
          {title}
        </Text>

        {actions?.length && (
          <NotificationActions
            className={cnNotificationHeader('Action')}
            items={actions}
            scrollContainerRef={scrollContainerRef}
          />
        )}
        {onClose && (
          <Button
            className={cnNotificationHeader('CloseButton')}
            size="xs"
            view="clear"
            iconLeft={IconClose}
            onClick={onClose}
          />
        )}
      </div>
    );
  },
);
