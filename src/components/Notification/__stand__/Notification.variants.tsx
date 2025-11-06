import './Notification.variants.css';

import { useBoolean } from '@consta/stand';
import React from 'react';

import { Notification } from '##/components/Notification';
import { cn } from '##/utils/bem';

import { actions, items } from '../__mocks__/data.mock';

const cnNotificationVariants = cn('NotificationVariants');

export const Variants = () => {
  const isMobile = useBoolean('isMobile', false);
  return (
    <Notification
      listClassName={cnNotificationVariants('List', { isDesktop: !isMobile })}
      items={items}
      title="Уведомления"
      actions={actions}
      groupByDay
      isMobile={isMobile}
    />
  );
};

export default Variants;
