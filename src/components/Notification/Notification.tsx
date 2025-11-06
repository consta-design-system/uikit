import './Notification.css';

// import { IconRing } from '@consta/icons/IconRing';
import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

// import { PopoverButton } from '../PopoverButton';
import { NotificationList } from './NotificationList';
import { NotificationComponent, NotificationProps } from './types';

export const cnNotification = cn('Notification');

const NotificationRender = (
  props: NotificationProps,
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
    className: cnNotification('List', [listClassName]),
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
    <NotificationList
      {...listProps}
      // onClose={isMobile ? onClose : undefined}
      style={{ zIndex: elementZIndex }}
    />
  );
};

export const Notification = forwardRef(
  NotificationRender,
) as NotificationComponent;
