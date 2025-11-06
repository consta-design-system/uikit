import './NotificationItemFooter.css';

import React, { useRef } from 'react';

import { BadgePropView } from '##/components/Badge';
import { BadgeGroup } from '##/components/BadgeGroup';
import { Text } from '##/components/Text';
import { useComponentSize } from '##/hooks/useComponentSize';
import { cn } from '##/utils/bem';

import { defaultDateFormat } from './helpers';
import { NotificationItemFooterProps } from './types';

const cnNotificationItemFooter = cn('NotificationItemFooter');
const getItemView = (): BadgePropView => 'stroked';

export const NotificationItemFooter: React.FC<NotificationItemFooterProps> = (
  props,
) => {
  const { badges = [], dateFormat = defaultDateFormat, date } = props;
  const timeRef = useRef<HTMLDivElement>(null);
  const { width: timeWidth } = useComponentSize(timeRef);

  if (badges || date) {
    return (
      <div
        className={cnNotificationItemFooter()}
        style={{ ['--time-width' as string]: `${Math.ceil(timeWidth)}px` }}
      >
        <BadgeGroup
          className={cnNotificationItemFooter('Badges')}
          items={badges}
          size="s"
          fitMode="reduction"
          getItemKey={(item) => item.label}
          getItemView={getItemView}
        />
        {date && (
          <Text
            className={cnNotificationItemFooter('Time')}
            size="xs"
            view="secondary"
            lineHeight="m"
            ref={timeRef}
          >
            {dateFormat(date)}
          </Text>
        )}
      </div>
    );
  }

  return null;
};
