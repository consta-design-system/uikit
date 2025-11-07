import './NotificationItem.css';

import React, { forwardRef } from 'react';

import { Avatar } from '##/components/Avatar';
import { BadgePropView } from '##/components/Badge';
import { BadgeGroup } from '##/components/BadgeGroup';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { isString } from '##/utils/type-guards';

import { NotificationActions } from '../NotificationActions';
import { NotificationItemFooter } from '../NotificationItemFooter';
import { NotificationItemBadge, NotificationItemProps } from './types';

const badgeGroupGetItemView = (): BadgePropView => 'stroked';
const badgeGroupGetItemLabel = (item: NotificationItemBadge) => item.label;

export const cnNotificationItem = cn('NotificationItem');

const renderContent = (content: React.ReactNode) =>
  isString(content) ? <Text size="s" view="primary" lineHeight="m" /> : content;

export const NotificationItem = forwardRef(
  (props: NotificationItemProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      title,
      className,
      content,
      userName,
      userImageUrl,
      date,
      badges,
      actions,
      actionsMenuOpened,
      status,
      ...otherProps
    } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnNotificationItem(null, [
          cnMixFlex({ gap: 'm' }),
          className,
        ])}
      >
        {(userName || userImageUrl) && (
          <Avatar
            size="l"
            name={userName}
            title={userName}
            url={userImageUrl}
            className={cnNotificationItem('Avatar')}
          />
        )}
        <div className={cnNotificationItem('Content')}>
          <Text
            weight="semibold"
            className={cnNotificationItem('Title', {
              cardWithActions: !!actions?.length,
            })}
            view="primary"
            size="m"
            lineHeight="m"
          >
            {title}
          </Text>
          {date && badges?.length && (
            <div className={cnNotificationItem('AdditionalInfo')}>
              {date && <div className={cnNotificationItem('Date')}>{date}</div>}
              {badges.length && (
                <BadgeGroup
                  className={cnNotificationItem('Badges')}
                  items={badges}
                  size="s"
                  fitMode="reduction"
                  getItemKey={badgeGroupGetItemLabel}
                  getItemView={badgeGroupGetItemView}
                  getItemLabel={badgeGroupGetItemLabel}
                />
              )}
            </div>
          )}

          {/* <NotificationItemFooter badges={badges} date={date} /> */}
          <div className={cnNotificationItem('Children')}>
            {content && renderContent(content)}
          </div>
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
