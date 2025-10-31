import './Notifications.css';

// import { IconRing } from '@consta/icons/IconRing';
import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

// import { PopoverButton } from '../PopoverButton';
import { NotificationsList } from './NotificationsList';
import { NotificationsComponent, NotificationsProps } from './types';

export const cnNotifications = cn('Notifications');

const NotificationsRender = (
  props: NotificationsProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const {
    // className,
    items,
    groupByDay,
    groups,
    groupLabelFormat,
    // itemDateFormat,
    title,
    actions,
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
    getItemLabel,
    getItemRead,
    getItemView,
    listClassName,
    // isMobile,
    // ...otherProps
  } = props;

  const listProps = {
    className: cnNotifications('List', [listClassName]),
    items,
    groupByDay,
    groups,
    groupLabelFormat,
    title,
    actions,
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
    getItemLabel,
    getItemRead,
    getItemView,
  };

  const elementZIndex =
    typeof props.style?.zIndex === 'number'
      ? props.style.zIndex + 1
      : undefined;

  return (
    <NotificationsList
      {...listProps}
      // onClose={isMobile ? onClose : undefined}
      style={{ zIndex: elementZIndex }}
    />
  );
};

export const Notifications = forwardRef(
  NotificationsRender,
) as NotificationsComponent;
