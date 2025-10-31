import './NotificationsItem.css';

import React, { forwardRef } from 'react';

import { Avatar } from '##/components/Avatar';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { NotificationsActions } from '../NotificationsActions';
import { NotificationsItemFooter } from '../NotificationsItemFooter';
import { NotificationsItemProps } from './types';

export const cnNotificationsItem = cn('NotificationsItem');

export const NotificationsItem = forwardRef(
  (props: NotificationsItemProps, ref: React.Ref<HTMLDivElement>) => {
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
        className={cnNotificationsItem(null, [className])}
      >
        {(imageUrl || view === 'user') && (
          <Avatar
            size="l"
            name={title}
            url={imageUrl}
            className={cnNotificationsItem('Image', [cnMixSpace({ mR: 'm' })])}
          />
        )}
        <div className={cnNotificationsItem('Content')}>
          <div className={cnNotificationsItem('Text')}>
            <Text
              weight={!read ? 'bold' : undefined}
              className={cnNotificationsItem('Title', {
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
          <NotificationsItemFooter
            badges={badges}
            date={date}
            dateFormat={dateFormat}
          />
          {actions?.length && (
            <NotificationsActions
              className={cnNotificationsItem('Actions')}
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
