import './NotificationItem.css';

import React, { forwardRef } from 'react';

import { Avatar } from '##/components/Avatar';
import { Badge } from '##/components/Badge';
import { Text } from '##/components/Text';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { isNotNil, isString } from '##/utils/type-guards';

import { NotificationActions } from '../NotificationActions';
import { NotificationCaption } from '../NotificationCaption';
import { NotificationItemProps } from './types';

export const cnNotificationItem = cn('NotificationItem');

const renderContent = (content: React.ReactNode, mr: boolean) =>
  isString(content) ? (
    <Text
      size="s"
      view="primary"
      lineHeight="m"
      className={mr ? cnNotificationItem('MixMR') : undefined}
    >
      {content}
    </Text>
  ) : (
    content
  );

const renderCaption = (node: React.ReactNode, mr: boolean) => {
  if (!node || (Array.isArray(node) && node.filter(isNotNil).length === 0))
    return null;

  return (
    <div
      className={cnNotificationItem('Caption', [
        cnMixFlex({ gap: 'xs', align: 'center' }),
        cnMixSpace({ mB: '2xs' }),
        mr ? cnNotificationItem('MixMR') : undefined,
      ])}
    >
      {isString(node) ? (
        <NotificationCaption>{node}</NotificationCaption>
      ) : (
        node
      )}
    </div>
  );
};

export const NotificationItem = forwardRef(
  (props: NotificationItemProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      title,
      className,
      content,
      userName,
      userImageUrl,
      caption,
      actions,
      read,
      scrollContainerRef,
      ...otherProps
    } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnNotificationItem(
          {
            withAvatar: !!(userName || userImageUrl),
            clickable: !!otherProps.onClick,
          },
          [className],
        )}
      >
        <div className={cnMixFlex({ gap: 'm' })}>
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
            {title && (
              <div
                className={cnNotificationItem('TitleWrapper', [
                  cnMixFlex({
                    gap: 'xs',
                    direction: 'row',
                    align: 'center',
                  }),
                  cnMixSpace({ mB: '2xs' }),
                  actions?.length ? cnNotificationItem('MixMR') : undefined,
                ])}
              >
                {read === false && (
                  <Badge
                    className={cnNotificationItem('Badge')}
                    size="s"
                    status="normal"
                    minified
                  />
                )}
                <Text
                  weight="semibold"
                  className={cnNotificationItem('Title')}
                  view="primary"
                  size="s"
                  lineHeight="m"
                  truncate
                >
                  {title}
                </Text>
              </div>
            )}
            {renderCaption(caption, !!actions?.length && !title)}
            <div className={cnNotificationItem('Children')}>
              {content && renderContent(content, !!(actions?.length && !title))}
            </div>
            {actions?.length && (
              <NotificationActions
                className={cnNotificationItem('Actions')}
                items={actions}
                onlyIcon
                style={{ zIndex: props.style?.zIndex }}
                scrollContainerRef={scrollContainerRef}
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

export * from './types';
