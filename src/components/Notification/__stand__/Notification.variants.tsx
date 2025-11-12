import './Notification.variants.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconUser } from '@consta/icons/IconUser';
import { useBoolean, useSelect, useText } from '@consta/stand';
import { lastBreakpointAtom } from '@consta/stand/src/modules/breakpoints';
import { useAtom } from '@reatom/npm-react';
import React, { useState } from 'react';

import { BadgePropStatus } from '##/components/Badge';
import { ChipsChoice } from '##/components/Chips';
import { ChoiceGroup } from '##/components/ChoiceGroup';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';

import {
  Notification,
  NotificationActions,
  NotificationGroup,
  NotificationItem,
} from '..';
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
  const badges = useBoolean('badges', false, enable);
  const actions = useBoolean('actions', false, enable);
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

  const actionsArray: Array<{
    label: string;
    onClick: () => void;
    icon: IconComponent;
  }> = [
    { label: 'Удалить', onClick: () => {}, icon: IconTrash },
    { label: 'Редактировать', onClick: () => {}, icon: IconEdit },
    { label: 'Пользователь', onClick: () => {}, icon: IconUser },
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

const useNotificationActionsProps = (enable: boolean) => {
  const onlyIcon = useBoolean('onlyIcon', false, enable);
  const multiActions = useBoolean('multiActions', false, enable);
  const actionsWithIcon = useBoolean('actionsWithIcon', false, enable);

  const items: Array<{
    label: string;
    onClick: () => void;
    icon?: IconComponent;
  }> = [
    {
      label: 'Удалить',
      onClick: () => {},
      icon: actionsWithIcon ? IconTrash : undefined,
    },
    ...(multiActions
      ? [
          {
            label: 'Редактировать',
            onClick: () => {},
            icon: actionsWithIcon ? IconEdit : undefined,
          },
          {
            label: 'Пользователь',
            onClick: () => {},
            icon: actionsWithIcon ? IconUser : undefined,
          },
        ]
      : []),
  ];

  return {
    items,
    onlyIcon,
  };
};

const useNotificationGroupProps = (enable: boolean) => {
  const label = useText('label', 'Группа', enable);

  const multiActions = useBoolean('multiActions', false, enable);
  const actionsWithIcon = useBoolean('actionsWithIcon', false, enable);

  const actions: Array<{
    label: string;
    onClick: () => void;
    icon?: IconComponent;
  }> = [
    {
      label: 'Удалить',
      onClick: () => {},
      icon: actionsWithIcon ? IconTrash : undefined,
    },
    ...(multiActions
      ? [
          {
            label: 'Редактировать',
            onClick: () => {},
            icon: actionsWithIcon ? IconEdit : undefined,
          },
          {
            label: 'Пользователь',
            onClick: () => {},
            icon: actionsWithIcon ? IconUser : undefined,
          },
        ]
      : []),
  ];

  return {
    label,
    actions,
  };
};

const NotificationActionsVariants = () => {
  const notificationItemProps = useNotificationActionsProps(true);
  return <NotificationActions {...notificationItemProps} />;
};

const NotificationItemVariants = () => {
  const notificationItemProps = useNotificationItemProps(true);
  return <NotificationItem {...notificationItemProps} />;
};

const NotificationGroupVariants = () => {
  const notificationGroupProps = useNotificationGroupProps(true);
  return <NotificationGroup {...notificationGroupProps} />;
};

const mapComponent = {
  NotificationActions: NotificationActionsVariants,
  NotificationItem: NotificationItemVariants,
  NotificationGroup: NotificationGroupVariants,
  NotificationGroups: NotificationGroupVariants,
};

const keysComponent = Object.keys(
  mapComponent,
) as (keyof typeof mapComponent)[];

// console.log(keysComponent);
const defaultComponent = keysComponent[0];

const getItem = (item: keyof typeof mapComponent) => item;

export const Variants = () => {
  const [component, setComponent] = useState(defaultComponent);

  const [f] = useAtom(lastBreakpointAtom);

  console.log(f);

  const Component = mapComponent[component || defaultComponent];

  return (
    <div className={cnNotificationVariants()}>
      <div
        className={cnNotificationVariants('Header', [
          cnMixScrollBar({ invisible: true }),
        ])}
      >
        <div className={cnNotificationVariants('ChoiceWrapper')}>
          <ChipsChoice
            className={cnNotificationVariants('Choice')}
            size="xs"
            getItemLabel={getItem}
            getItemKey={getItem}
            items={keysComponent}
            value={component}
            onChange={setComponent}
          />
        </div>
      </div>
      <div className={cnNotificationVariants('Body')}>
        <Component />
      </div>
    </div>
  );
};

export default Variants;
