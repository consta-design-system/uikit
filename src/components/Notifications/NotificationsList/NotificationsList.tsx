import './NotificationsList.css';

import { IconClose } from '@consta/icons/IconClose';
import React, { forwardRef, Fragment } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { NotificationsActions } from '../NotificationsActions';
import { NotificationsItem } from '../NotificationsItem';
import {
  defaultGroupLabelFormat,
  getGroups,
  withDefaultGetters,
} from './helpers';
import { NotificationsListComponent, NotificationsListProps } from './types';

export const cnNotificationsList = cn('NotificationsList');

function NotificationsListRender(
  props: NotificationsListProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    items,
    groupByDay = false,
    groups,
    groupLabelFormat = defaultGroupLabelFormat,
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
    getItemDate,
    getItemDescription,
    getItemGroup,
    getItemImage,
    getItemRead,
    getItemView,
    onClose,
    ...otherProps
  } = withDefaultGetters(props);

  const resultGroups = getGroups(
    items,
    groups,
    groupByDay,
    getItemGroup,
    getItemDate,
    getGroupId,
  );

  const elementZIndex =
    typeof props.style?.zIndex === 'number'
      ? props.style.zIndex + 1
      : undefined;

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnNotificationsList(null, [className])}
    >
      {(title || actions) && (
        <div
          className={cnNotificationsList('Header', [
            cnMixSpace({ pV: 'l', pH: 'xl' }),
          ])}
        >
          <Text
            className={cnNotificationsList('HeaderItem')}
            size="xl"
            truncate
            view="primary"
            lineHeight="m"
          >
            {title}
          </Text>
          {actions?.length && (
            <NotificationsActions
              className={cnNotificationsList('HeaderItem')}
              items={actions}
              getItemIcon={getActionIcon}
              getItemOnClick={getActionOnClick}
              getItemLabel={getActionLabel}
              style={{ zIndex: elementZIndex }}
            />
          )}
          {onClose && (
            <Button
              className={cnNotificationsList('HeaderItem')}
              size="s"
              view="clear"
              iconLeft={IconClose}
              onClick={onClose}
            />
          )}
        </div>
      )}
      <div className={cnNotificationsList('List')}>
        {resultGroups.map((group, groupIndex) => {
          const groupLabel = groupByDay
            ? groupLabelFormat(Number(group.key))
            : group.group && getGroupLabel(group.group);
          return (
            <Fragment key={cnNotificationsList('Group', { groupIndex })}>
              {groupLabel && (
                <Text
                  className={cnNotificationsList('GroupLabel', [
                    cnMixSpace({
                      pV: '2xs',
                      pH: 'xl',
                    }),
                  ])}
                  key={cnNotificationsList('GroupLabel', { groupIndex })}
                  view="secondary"
                  transform="uppercase"
                  weight="bold"
                  size="2xs"
                  lineHeight="m"
                >
                  {groupLabel}
                </Text>
              )}
              {group.items.map((item, itemIndex) => {
                return (
                  <NotificationsItem
                    className={cnNotificationsList('Item', [
                      cnMixSpace({ pV: 'l', pH: 'xl' }),
                    ])}
                    key={cnNotificationsList('Item', { groupIndex, itemIndex })}
                    title={getItemLabel(item)}
                    description={getItemDescription(item)}
                    imageUrl={getItemImage(item)}
                    read={getItemRead(item)}
                    date={getItemDate(item)}
                    dateFormat={itemDateFormat}
                    badges={getItemBadges(item)}
                    actions={getItemActions(item)}
                    view={getItemView(item)}
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

export const NotificationsList = forwardRef(
  NotificationsListRender,
) as NotificationsListComponent;

export * from './types';
