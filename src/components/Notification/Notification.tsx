import './Notification.css';

// import { IconRing } from '@consta/icons/IconRing';
import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';
import { withCtx } from '##/utils/state';
import { useCreateAtom } from '##/utils/state/useCreateAtom';

// import { PopoverButton } from '../PopoverButton';
import { NotificationList } from './NotificationList';
import { NotificationRoot } from './NotificationRoot';
import { NotificationComponent, NotificationProps } from './types';

export const cnNotification = cn('Notification');

// TODO: В место которое для даты вставляем текст из caption (getItemCaption), также добавляем getItemDate для того чтобы группировать по дате. при groupByDay в getGroupLabel должен приходить timestamp дня.

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
    // getItemView,
    // listClassName,
    // isMobile,
    // ...otherProps
  } = props;

  const listProps = {
    className: cnNotification('List'),
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
  const openAtom = useCreateAtom(false);

  return (
    <NotificationRoot openAtom={openAtom}>
      <NotificationList {...listProps} />
    </NotificationRoot>
  );
};

export const Notification = withCtx(
  forwardRef(NotificationRender),
) as NotificationComponent;
