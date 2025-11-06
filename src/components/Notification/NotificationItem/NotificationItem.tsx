import './NotificationItem.css';

import React, { forwardRef } from 'react';

import { Avatar } from '##/components/Avatar';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { NotificationActions } from '../NotificationActions';
import { NotificationItemFooter } from '../NotificationItemFooter';
import { NotificationItemProps } from './types';

export const cnNotificationItem = cn('NotificationItem');

export const NotificationItem = forwardRef(
  (props: NotificationItemProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      title,
      className,
      description,
      imageUrl,
      view = 'default',
      read,
      date,
      dateFormat,
      badges = [],
      actions,
      actionsMenuOpened,
      ...otherProps
    } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnNotificationItem(null, [className])}
      >
        {(imageUrl || view === 'user') && (
          <Avatar
            size="l"
            name={title}
            url={imageUrl}
            className={cnNotificationItem('Image', [cnMixSpace({ mR: 'm' })])}
          />
        )}
        <div className={cnNotificationItem('Content')}>
          <div className={cnNotificationItem('Text')}>
            <Text
              weight={!read ? 'bold' : undefined}
              className={cnNotificationItem('Title', {
                cardWithActions: !!actions?.length,
              })}
              view="primary"
              size="m"
              lineHeight="m"
            >
              {title}
            </Text>
            {description && (
              <Text size="s" view="primary" lineHeight="m">
                {description}
              </Text>
            )}
          </div>
          <NotificationItemFooter
            badges={badges}
            date={date}
            dateFormat={dateFormat}
          />
          {actions?.length && (
            <NotificationActions
              className={cnNotificationItem('Actions')}
              items={actions}
              mainButtonOnlyIcon
              opened={actionsMenuOpened}
              style={{ zIndex: props.style?.zIndex }}
            />
          )}
        </div>
      </div>
    );
  },
);

export * from './types';
