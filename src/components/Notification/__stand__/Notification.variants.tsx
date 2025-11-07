import './Notification.variants.css';

import { useBoolean } from '@consta/stand';
import React from 'react';

import { Notification, NotificationItem } from '##/components/Notification';
import { cn } from '##/utils/bem';

import { actions, items } from '../__mocks__/data.mock';

const cnNotificationVariants = cn('NotificationVariants');

export const Variants = () => {
  const isMobile = useBoolean('isMobile', false);

  return (
    <div className={cnNotificationVariants()}>
      <NotificationItem
        title="Notification"
        userName="John Doe"
        date="2019-01-01"
        badges={[
          { label: 'Работа', status: 'success' },
          { label: 'Важное', status: 'warning' },
          { label: 'Отпуск', status: 'normal' },
          { label: 'Работа', status: 'success' },
          { label: 'Важное', status: 'warning' },
          { label: 'Отпуск', status: 'normal' },
          { label: 'Работа', status: 'success' },
          { label: 'Важное', status: 'warning' },
          { label: 'Отпуск', status: 'normal' },
        ]}
        status="normal"
        actions={[{ label: 'Открыть', onClick: () => {} }]}
      />
    </div>
  );
};

export default Variants;
