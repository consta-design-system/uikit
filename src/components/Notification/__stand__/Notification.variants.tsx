import './Notification.variants.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconAllDone } from '@consta/icons/IconAllDone';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconUser } from '@consta/icons/IconUser';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { BadgePropStatus } from '##/components/Badge';
import { ChipsChoice } from '##/components/Chips';
import { ChoiceGroup } from '##/components/ChoiceGroup';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';
import { keys } from '##/utils/object/keys';

import {
  Notification,
  NotificationActions,
  NotificationGroup,
  NotificationItem,
} from '..';
import { actions, groups, items } from '../__mocks__/data.mock';

const cnNotificationVariants = cn('NotificationVariants');

const NotificationActionsVariants = () => {
  const onlyIcon = useBoolean('onlyIcon');

  const actionsWithIcon = useBoolean('actionsWithIcon');
  const multiActions = useBoolean('multiActions');

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
  return <NotificationActions items={items} onlyIcon={onlyIcon} />;
};

const NotificationItemVariants = () => {
  const title = useText('title', 'Заявка на изменение договора');
  const userName = useText('userName', 'Андрей Иванов');
  const date = useText('date', '17:16 15.12.2024');
  const content = useText(
    'content',
    'Получена заявка на изменение договора. Согласовать до 31.01.2025 года',
  );
  const badges = useBoolean('badges');
  const actions = useBoolean('actions');
  const status = useSelect<BadgePropStatus>(
    'status',
    ['success', 'warning', 'normal', 'alert', 'system', 'disabled', 'error'],
    undefined,
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

  return (
    <NotificationItem
      title={title}
      userName={userName}
      date={date}
      content={content}
      badges={badges ? badgesArray : undefined}
      actions={actions ? actionsArray : undefined}
      status={status}
    />
  );
};

const NotificationGroupVariants = () => {
  const label = useText('label', 'Группа');

  const actionsWithIcon = useBoolean('actionsWithIcon');
  const multiActions = useBoolean('multiActions');

  const actions: Array<{
    label: string;
    onClick: () => void;
    icon?: IconComponent;
  }> = [
    {
      label: 'Прочитать всё',
      onClick: () => {},
      icon: actionsWithIcon ? IconAllDone : undefined,
    },
    ...(multiActions
      ? [
          {
            label: 'Удалить всё',
            onClick: () => {},
            icon: actionsWithIcon ? IconTrash : undefined,
          },
        ]
      : []),
  ];

  return <NotificationGroup label={label} actions={actions} />;
};

const NotificationVariants = () => {
  return <Notification items={items} groups={groups} />;
};

const mapComponent = {
  Notification: NotificationVariants,
  NotificationGroup: NotificationGroupVariants,
  NotificationActions: NotificationActionsVariants,
  NotificationItem: NotificationItemVariants,
};

const keysComponent = keys(mapComponent);

const defaultComponent = keysComponent[0];

const getItem = (item: keyof typeof mapComponent) => item;

export const Variants = () => {
  const [component, setComponent] = useState(defaultComponent);

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
