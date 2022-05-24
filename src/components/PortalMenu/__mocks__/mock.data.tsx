import React from 'react';

import { Badge } from '../../Badge/Badge';
import { DefaultMenuGroup, DefaultMenuItem } from '../types';

export type Item = DefaultMenuItem & {
  deprecated?: boolean;
};

export const navigationPackages: Item[] = [
  {
    key: 'navigation-7',
    label: 'Обзор',
    active: true,
  },
];

export const navigation: Item[] = [
  {
    key: 'navigation-1',
    label: 'О дизайн-системе',
    active: true,
  },
  {
    key: 'navigation-2',
    label: 'Лицензионная политика',
  },
  {
    key: 'navigation-3',
    label: 'Стратегия развития',
    subMenu: [
      {
        key: 'navigation-3-1',
        label: 'Система версионирования',
      },
      {
        key: 'navigation-3-2',
        label: 'История изменений',
      },
      {
        key: 'navigation-3-3',
        label: 'Дорожная карта',
      },
    ],
  },
  {
    key: 'navigation-4',
    label: 'Контрибьютинг',
    subMenu: [
      {
        key: 'navigation-4-1',
        label: 'Протокол принятия изменений 🛠',
      },
      {
        key: 'navigation-4-2',
        label: 'Правила оформления кода',
      },
      {
        key: 'navigation-4-3',
        label: 'В коде',
      },
      {
        key: 'navigation-4-4',
        label: 'В дизайне',
      },
    ],
  },
  {
    key: 'navigation-5',
    label: 'Команда',
  },
  {
    key: 'navigation-6',
    label: 'Помощь',
  },
];

export const groups: DefaultMenuGroup[] = [
  {
    id: 'groups-1',
    label: 'библиотеки компонентов',
  },
  {
    id: 'groups-2',
    label: 'расширенные компоненты',
  },
  {
    id: 'groups-3',
    label: 'адапетры',
  },
];

export const packages: Item[] = [
  {
    key: '1',
    label: 'Consta UI-kit',
    badge: <Badge label="V 12.2.12" status="system" view="stroked" size="s" />,
    groupId: 'groups-1',
  },
  {
    key: '2',
    label: 'Consta Charts',
    badge: <Badge label="V 12.2.12" status="system" view="stroked" size="s" />,
    groupId: 'groups-1',
  },
  {
    key: '3',
    label: 'Дерево',
    description: 'Navigation tree',
    groupId: 'groups-2',
  },
  {
    key: '4',
    label: 'Форма обратной связи',
    description: 'ConstaFeedbackForm',
    groupId: 'groups-2',
  },
  {
    key: '5',
    label: 'Шапка',
    description: 'ConstaFeedbackForm',
    groupId: 'groups-2',
  },
  {
    key: '6',
    label: 'Адаптер для таблиц 1',
    description: 'ConstaUltraTable',
    groupId: 'groups-3',
  },
  {
    key: '7',
    label: 'Адаптер для таблиц 1',
    description: 'ConstaUltraTable',
    groupId: 'groups-3',
  },
  {
    key: '8',
    label: 'Адаптер для таблиц 1',
    description: 'ConstaUltraTable',
    groupId: 'groups-3',
  },
];

export const components: Item[] = [
  {
    key: '1',
    label: 'Обзор',
    groupId: 'groups-1-1',
  },
  {
    key: '2',
    label: 'Attachment',
    groupId: 'groups-1-2',
  },
  {
    key: '3',
    label: 'BasicSelect',
    groupId: 'groups-1-2',
    deprecated: true,
    badge: <Badge label="deprecated" status="error" view="stroked" size="s" />,
  },
  {
    key: '4',
    label: 'Button',
    groupId: 'groups-1-2',
  },
  {
    key: '5',
    label: 'Calendar',
    groupId: 'groups-1-2',
    deprecated: true,
    badge: <Badge label="deprecated" status="error" view="stroked" size="s" />,
  },
  {
    key: '6',
    label: 'CheckBox',
    groupId: 'groups-1-2',
  },
  {
    key: '7',
    label: 'CheckBoxGroup',
    groupId: 'groups-1-2',
  },
  {
    key: '8',
    label: 'MultiCombobox',
    groupId: 'groups-1-2',
    badge: <Badge label="deprecated" status="error" view="stroked" size="s" />,
    deprecated: true,
  },
  {
    key: '9',
    label: 'ProgressStepBar',
    groupId: 'groups-1-3',
    badge: <Badge label="canary" status="success" view="filled" size="s" />,
  },
  {
    key: '10',
    label: 'NewComponent',
    groupId: 'groups-1-3',
    badge: <Badge label="в работе" status="warning" view="filled" size="s" />,
  },
];

export const componentsGroup: DefaultMenuGroup[] = [
  {
    id: 'groups-1-1',
    label: 'компоненты',
  },
  {
    id: 'groups-1-2',
    label: 'базовые',
  },
  {
    id: 'groups-1-3',
    label: 'служебные',
  },
];
