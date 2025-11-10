import './NotificationItem.css';

import { useAtom } from '@reatom/npm-react';
import React, { forwardRef } from 'react';

import { Avatar } from '##/components/Avatar';
import { Badge, BadgePropView } from '##/components/Badge';
import { BadgeGroup } from '##/components/BadgeGroup';
import { Text } from '##/components/Text';
import { getElementWidth } from '##/hooks/useResizeObserved';
import { cnMixFlex } from '##/mixs/MixFlex';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { withCtx } from '##/utils/state';
import { useCreateAtom } from '##/utils/state/useCreateAtom';
import { useRefAtom } from '##/utils/state/useRefAtom';
import { useResizeObservedAtom } from '##/utils/state/useResizeObservedAtom';
import { isString } from '##/utils/type-guards';

import { NotificationActions } from '../NotificationActions';
import { NotificationItemBadge, NotificationItemProps } from './types';

const badgeGroupGetItemView = (): BadgePropView => 'tinted';
const badgeGroupGetItemLabel = (item: NotificationItemBadge) => item.label;

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

export const NotificationItem = withCtx(
  forwardRef((props: NotificationItemProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      title,
      className,
      content,
      userName,
      userImageUrl,
      date,
      badges,
      actions,
      status,
      ...otherProps
    } = props;

    const [userElAtom, userRef] = useRefAtom<HTMLDivElement>();
    const [wrapperElAtom, wrapperRef] = useRefAtom<HTMLDivElement>();

    const [widths] = useAtom(
      useResizeObservedAtom(
        useCreateAtom((ctx) => [ctx.spy(userElAtom), ctx.spy(wrapperElAtom)]),
        getElementWidth,
      ),
    );

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnNotificationItem(
          { withAvatar: !!(userName || userImageUrl) },
          [className],
        )}
      >
        <div
          ref={wrapperRef}
          className={cnMixFlex({ gap: 'm' })}
          style={{
            ['--notification-item-user-width' as string]: `${widths[0]}px`,
            ['--notification-item-wrapper-width' as string]: `${widths[1]}px`,
          }}
        >
          {(userName || userImageUrl) && (
            <Avatar
              ref={userRef}
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
                {status && (
                  <Badge
                    className={cnNotificationItem('Badge')}
                    size="s"
                    status={status}
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
            {(date || badges?.length) && (
              <div
                className={cnNotificationItem('AdditionalInfo', [
                  cnMixFlex({ gap: 'xs', align: 'center' }),
                  cnMixSpace({ mB: '2xs' }),
                  actions?.length && !title
                    ? cnNotificationItem('MixMR')
                    : undefined,
                ])}
              >
                {date && (
                  <Text
                    className={cnNotificationItem('Date')}
                    size="2xs"
                    lineHeight="m"
                    view="ghost"
                  >
                    {date}
                  </Text>
                )}
                {badges?.length && (
                  <BadgeGroup
                    className={cnNotificationItem('Badges')}
                    items={badges}
                    size="xs"
                    fitMode="reduction"
                    getItemKey={badgeGroupGetItemLabel}
                    getItemView={badgeGroupGetItemView}
                    getItemLabel={badgeGroupGetItemLabel}
                  />
                )}
              </div>
            )}
            <div className={cnNotificationItem('Children')}>
              {content && renderContent(content, !!(actions?.length && !title))}
            </div>
            {actions?.length && (
              <NotificationActions
                className={cnNotificationItem('Actions')}
                items={actions}
                mainButtonOnlyIcon
                style={{ zIndex: props.style?.zIndex }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }),
);

export * from './types';
