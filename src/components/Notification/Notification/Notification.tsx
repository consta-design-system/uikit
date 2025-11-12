import './Notification.css';

import React, { forwardRef, Fragment } from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { getGroups } from '##/utils/getGroups';

import { NotificationGroup } from '../NotificationGroup';
import { NotificationItem } from '../NotificationItem';
import { withDefaultGetters } from './helpers';
import { NotificationComponent, NotificationProps } from './types';

export const cnNotification = cn('Notification');

function NotificationRender(
  props: NotificationProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    items,
    groups,
    getItemLabel,
    getGroupId,
    getGroupLabel,
    getItemActions,
    getItemContent,
    getItemGroup,
    getItemRead,
    getItemUserName,
    getItemUserImage,
    getItemCaption,
    sortGroups,
    getGroupActions,
    itemSpace,
    groupSpace,
    itemRender,
    getItemClassName,
    groupRender,
    onItemClick,
    scrollContainerRef,
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
      className={cnNotification(null, [className])}
    >
      {resultGroups.map((group, groupIndex) => (
        <Fragment key={cnNotification('Group', { groupIndex })}>
          {groupRender ? (
            groupRender(group)
          ) : (
            <NotificationGroup
              key={cnNotification('Group', { groupIndex })}
              title={getGroupLabel(group)}
              actions={getGroupActions?.(group)}
              className={cnMixSpace(
                groupSpace || { pV: 'xs', pH: 's', mB: 's' },
              )}
            />
          )}
          {group.items.map((item, itemIndex) => {
            return itemRender ? (
              itemRender(item)
            ) : (
              <NotificationItem
                className={cnNotification('Item', [
                  cnMixSpace(itemSpace || { pH: 's', mB: 's' }),
                  getItemClassName?.(item),
                ])}
                key={cnNotification('Item', { itemIndex })}
                title={getItemLabel(item)}
                content={getItemContent(item)}
                userName={getItemUserName(item)}
                userImageUrl={getItemUserImage(item)}
                actions={getItemActions(item)}
                caption={getItemCaption(item)}
                read={getItemRead(item)}
                style={{ zIndex: elementZIndex }}
                scrollContainerRef={scrollContainerRef}
                onClick={
                  onItemClick ? (e) => onItemClick(item, { e }) : undefined
                }
              />
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

export const Notification = forwardRef(
  NotificationRender,
) as NotificationComponent;
