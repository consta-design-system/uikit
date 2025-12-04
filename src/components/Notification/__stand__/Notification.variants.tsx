import './Notification.variants.css';

import { IconComponent } from '@consta/icons/Icon';
import { IconAllDone } from '@consta/icons/IconAllDone';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconTrash } from '@consta/icons/IconTrash';
import { IconUser } from '@consta/icons/IconUser';
import { useBoolean, useText } from '@consta/stand';
import React, { useState } from 'react';

import { BadgeGroup } from '##/components/BadgeGroup';
import { ChipsChoice } from '##/components/Chips';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { keys } from '##/utils/object/keys';
import { isNotNil } from '##/utils/type-guards';

import {
  Notification,
  NotificationActions,
  NotificationCaption,
  NotificationGroup,
  NotificationHeader,
  NotificationItem,
} from '..';
import { items } from '../__mocks__/data.mock';
import {
  defaultDateFormat,
  groupLabelByDay,
  groupsByDay,
  sortGroupByDay,
} from '../helpers';

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
  const content = useText(
    'content',
    'Получена заявка на изменение договора. Согласовать до 31.01.2025 года',
  );

  const actions = useBoolean('actions');
  const read = useBoolean('read');

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
      content={content}
      actions={actions ? actionsArray : undefined}
      read={read}
    />
  );
};

const NotificationGroupVariants = () => {
  const title = useText('title', 'Группа');

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

  return (
    <NotificationGroup
      className={cnMixSpace({ pV: 'xs', pH: 's' })}
      title={title}
      actions={actions}
    />
  );
};

const NotificationVariants = () => {
  const withGroup = useBoolean('withGroup');
  const withActions = useBoolean('withActions');
  const groupsMultiActions = useBoolean(
    'groupsMultiActions',
    false,
    withActions && withGroup,
  );
  const withAvatar = useBoolean('withAvatar', true);
  const withCaption = useBoolean('withCaption', true);
  const withBadges = useBoolean('withBadges', true);

  return (
    <Notification
      items={items}
      getItemCaption={({ date, badges }) => [
        withCaption ? (
          <NotificationCaption>{defaultDateFormat(date)}</NotificationCaption>
        ) : undefined,
        withBadges ? (
          <BadgeGroup
            style={{ width: '100%' }}
            items={badges}
            size="xs"
            fitMode="reduction"
            getItemKey={(item) => item.label}
            getItemView={() => 'tinted'}
            getItemLabel={(item) => item.label}
          />
        ) : undefined,
      ]}
      getItemGroup={withGroup ? ({ date }) => groupsByDay(date) : undefined}
      getGroupLabel={withGroup ? ({ key }) => groupLabelByDay(key) : undefined}
      sortGroups={withGroup ? sortGroupByDay : undefined}
      getItemActions={withActions ? (item) => item.actions : () => undefined}
      getItemUserName={withAvatar ? (item) => item.label : undefined}
      getGroupActions={
        withActions
          ? () =>
              [
                {
                  label: 'Прочитать всё',
                  onClick: () => {},
                  icon: IconAllDone,
                },
                groupsMultiActions
                  ? { label: 'Удалить всё', onClick: () => {}, icon: IconTrash }
                  : undefined,
              ].filter(isNotNil)
          : undefined
      }
    />
  );
};

export const NotificationHeaderVariants = () => {
  const title = useText('title', 'Заголовок');
  const withActions = useBoolean('withActions');
  const withClose = useBoolean('withClose');

  return (
    <NotificationHeader
      title={title}
      onClose={withClose ? () => {} : undefined}
      actions={
        withActions
          ? [
              { label: 'Прочитать всю', onClick: () => {} },
              { label: 'Удалить всю', onClick: () => {} },
            ]
          : undefined
      }
    />
  );
};

const mapComponent = {
  Notification: NotificationVariants,
  NotificationHeader: NotificationHeaderVariants,
  NotificationGroup: NotificationGroupVariants,
  NotificationItem: NotificationItemVariants,
  NotificationActions: NotificationActionsVariants,
};

const keysComponent = keys(mapComponent);

const defaultComponent = keysComponent[0];

const getItem = (item: keyof typeof mapComponent) => item;

export const Variants = () => {
  const [component, setComponent] = useState(defaultComponent);

  const Component = mapComponent[component];

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
      <div className={cnNotificationVariants('Body', [cnMixScrollBar()])}>
        <Component />
      </div>
    </div>
  );
};

export default Variants;
