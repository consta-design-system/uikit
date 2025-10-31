import './Notifications.variants.css';

import { useBoolean } from '@consta/stand';
import React from 'react';

import { Notifications } from '##/components/Notifications';
import { cn } from '##/utils/bem';

import { actions, items } from '../__mocks__/data.mock';

const cnNotificationsVariants = cn('NotificationsVariants');

export const Variants = () => {
  const isMobile = useBoolean('isMobile', false);
  return (
    <Notifications
      listClassName={cnNotificationsVariants('List', { isDesktop: !isMobile })}
      items={items}
      title="Уведомления"
      actions={actions}
      groupByDay
      isMobile={isMobile}
    />
  );
};

export default Variants;
