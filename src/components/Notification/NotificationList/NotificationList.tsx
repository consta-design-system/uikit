import './NotificationList.css';

import { IconClose } from '@consta/icons/IconClose';
import React, { forwardRef, Fragment } from 'react';

import { Button } from '##/components/Button';
import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { NotificationActions } from '../NotificationActions';
import { NotificationItem } from '../NotificationItem';
import {
  defaultGroupLabelFormat,
  getGroups,
  withDefaultGetters,
} from './helpers';
import { NotificationListComponent, NotificationListProps } from './types';

export const cnNotificationList = cn('NotificationList');

function NotificationListRender(
  props: NotificationListProps,
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
          const groupLabel = groupByDay
            ? groupLabelFormat(Number(group.key))
            : group.group && getGroupLabel(group.group);
          return (
            <Fragment key={cnNotificationList('Group', { groupIndex })}>
              {groupLabel && (
                <Text
                  className={cnNotificationList('GroupLabel', [
                    cnMixSpace({
                      pV: '2xs',
                      pH: 'xl',
                    }),
                  ])}
                  key={cnNotificationList('GroupLabel', { groupIndex })}
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
                  <NotificationItem
                    className={cnNotificationList('Item', [
                      cnMixSpace({ pV: 'l', pH: 'xl' }),
                    ])}
                    key={cnNotificationList('Item', { groupIndex, itemIndex })}
                    title={getItemLabel(item)}
                    content={getItemDescription(item)}
                    imageUrl={getItemImage(item)}
                    date={getItemDate(item)}
                    dateFormat={itemDateFormat}
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
