import './Notification.variants.css';

import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { BadgePropStatus } from '##/components/Badge';
import { Notification, NotificationItem } from '##/components/Notification';
import { cn } from '##/utils/bem';

import { actions, items } from '../__mocks__/data.mock';

const cnNotificationVariants = cn('NotificationVariants');

const useNotificationItemProps = (enable: boolean) => {
  const title = useText('title', 'Заявка на изменение договора', enable);
  const userName = useText('userName', 'Андрей Иванов', enable);
  const date = useText('date', '17:16 15.12.2024', enable);
  const content = useText(
    'content',
    'Получена заявка на изменение договора. Согласовать до 31.01.2025 года',
    enable,
  );
  const badges = useBoolean('badges', enable);
  const actions = useBoolean('actions', enable);
  const status = useSelect<BadgePropStatus>(
    'status',
    ['success', 'warning', 'normal', 'alert', 'system', 'disabled', 'error'],
    undefined,
    enable,
  );

  const badgesArray: Array<{ label: string; status: BadgePropStatus }> = [
    { label: 'Работа', status: 'success' },
    { label: 'Важное', status: 'warning' },
    { label: 'Отпуск', status: 'normal' },
  ];

  const actionsArray: Array<{ label: string; onClick: () => void }> = [
    { label: 'Открыть', onClick: () => {} },
    { label: 'Редактировать', onClick: () => {} },
    { label: 'Удалить', onClick: () => {} },
  ];

  return {
    title,
    userName,
    date,
    content,
    badges: badges ? badgesArray : undefined,
    actions: actions ? actionsArray : undefined,
    status,
  };
};

export const Variants = () => {
  const component = useSelect(
    'component',
    ['Notification', 'NotificationItem'],
    'NotificationItem',
  );

  const notificationItemProps = useNotificationItemProps(
    component === 'NotificationItem',
  );

  if (component === 'Notification')
    return <Notification items={items} actions={actions} />;

  if (component === 'NotificationItem')
    return (
      <div className={cnNotificationVariants()}>
        <NotificationItem
          {...notificationItemProps}
          status={notificationItemProps.status}
        />
      </div>
    );
};

export default Variants;
