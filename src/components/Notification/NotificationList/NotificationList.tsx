import './NotificationList.css';

import { IconClose } from '@consta/icons/IconClose';
import React, { forwardRef, Fragment } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { getGroups } from '##/utils/getGroups';

import { NotificationActions } from '../NotificationActions';
import { NotificationGroup } from '../NotificationGroup';
import { NotificationItem } from '../NotificationItem';
import { withDefaultGetters } from './helpers';
import { NotificationListComponent, NotificationListProps } from './types';

export const cnNotificationList = cn('NotificationList');

function NotificationListRender(
  props: NotificationListProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    items,
    groups,
    itemDateFormat,
    title,
    actions,
    getItemLabel,
    getActionIcon,
    getActionLabel,
    getActionOnClick,
    getGroupId,
    getGroupLabel,
    getItemActions,
    getItemBadges,
    getItemDescription,
    getItemGroup,
    getItemRead,
    getItemUserName,
    getItemUserImage,
    getItemCaption,
    sortGroups,
    getGroupActions,
    onClose,
    ...otherProps
  } = withDefaultGetters(props);

  const resultGroups = getGroups(
    items,
    getItemGroup,
    groups,
    getGroupId,
    sortGroups,
  );

  const elementZIndex =
    typeof props.style?.zIndex === 'number'
      ? props.style.zIndex + 1
      : undefined;

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnNotificationList(null, [className])}
    >
      {(title || actions) && (
        <div
          className={cnNotificationList('Header', [
            cnMixSpace({ pV: 'l', pH: 'xl' }),
          ])}
        >
          <Text
            className={cnNotificationList('HeaderItem')}
            size="xl"
            truncate
            view="primary"
            lineHeight="m"
          >
            {title}
          </Text>
          {actions?.length && (
            <NotificationActions
              className={cnNotificationList('HeaderItem')}
              items={actions}
              getItemIcon={getActionIcon}
              getItemOnClick={getActionOnClick}
              getItemLabel={getActionLabel}
              style={{ zIndex: elementZIndex }}
            />
          )}
          {onClose && (
            <Button
              className={cnNotificationList('HeaderItem')}
              size="s"
              view="clear"
              iconLeft={IconClose}
              onClick={onClose}
            />
          )}
        </div>
      )}
      <div className={cnNotificationList('List')}>
        {resultGroups.map((group, groupIndex) => {
          const groupLabel = getGroupLabel(group);

          return (
            <Fragment key={cnNotificationList('Group', { groupIndex })}>
              {groupLabel && (
                <NotificationGroup
                  key={cnNotificationList('Group', { groupIndex })}
                  label={groupLabel}
                  actions={getGroupActions?.(group)}
                />
              )}
              {group.items.map((item, itemIndex) => {
                return (
                  <NotificationItem
                    className={cnNotificationList('Item', [
                      cnMixSpace({ pV: 'l', pH: 'xl' }),
                    ])}
                    key={cnNotificationList('Item', { groupIndex, itemIndex })}
                    title={getItemLabel(item)}
                    content={getItemDescription(item)}
                    userName={getItemUserName(item)}
                    userImageUrl={getItemUserImage(item)}
                    badges={getItemBadges(item)}
                    actions={getItemActions(item)}
                    style={{ zIndex: elementZIndex }}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export const NotificationList = forwardRef(
  NotificationListRender,
) as NotificationListComponent;

export * from './types';
