import { DefaultMenuGroup, DefaultNavigationItem, DefaultPackageItem } from '../types';

export type ComponentType = DefaultPackageItem & {
  deprecated?: boolean;
};

export const navigationPackages: DefaultNavigationItem[] = [
  {
    key: '1',
    label: 'Обзор',
    active: true,
  },
];

export const navigation: DefaultNavigationItem[] = [
  {
    key: '1',
    label: 'О дизайн-системе',
    active: true,
  },
  {
    key: '2',
    label: 'Лицензионная политика',
  },
  {
    key: '3',
    label: 'Стратегия развития',
    subMenu: [
      {
        key: '3-1',
        label: 'Система версионирования',
      },
      {
        key: '3-2',
        label: 'История изменений',
      },
      {
        key: '3-3',
        label: 'Дорожная карта',
      },
    ],
  },
  {
    key: '4',
    label: 'Контрибьютинг',
    subMenu: [
      {
        key: '4-1',
        label: 'Протокол принятия изменений 🛠',
      },
      {
        key: '4-2',
        label: 'Правила оформления кода',
      },
      {
        key: '4-3',
        label: 'В коде',
      },
      {
        key: '4-4',
        label: 'В дизайне',
      },
    ],
  },
  {
    key: '5',
    label: 'Команда',
  },
  {
    key: '6',
    label: 'Помощь',
  },
];

export const groups: DefaultMenuGroup[] = [
  {
    id: '1',
    label: 'библиотеки компонентов',
  },
  {
    id: '2',
    label: 'расширенные компоненты',
  },
  {
    id: '3',
    label: 'адапетры',
  },
];

export const packages: DefaultPackageItem[] = [
  {
    key: '1',
    label: 'Consta UI-kit',
    badgeLabel: 'V 12.2.12',
    groupId: '1',
  },
  {
    key: '2',
    label: 'Consta Charts',
    badgeLabel: 'V 12.2.12',
    groupId: '1',
  },
  {
    key: '3',
    label: 'Дерево',
    description: 'Navigation tree',
    groupId: '2',
  },
  {
    key: '4',
    label: 'Форма обратной связи',
    description: 'ConstaFeedbackForm',
    groupId: '2',
  },
  {
    key: '5',
    label: 'Шапка',
    description: 'ConstaFeedbackForm',
    groupId: '2',
  },
  {
    key: '6',
    label: 'Адаптер для таблиц 1',
    description: 'ConstaUltraTable',
    groupId: '3',
  },
  {
    key: '7',
    label: 'Адаптер для таблиц 1',
    description: 'ConstaUltraTable',
    groupId: '3',
  },
  {
    key: '8',
    label: 'Адаптер для таблиц 1',
    description: 'ConstaUltraTable',
    groupId: '3',
  },
];

export const components: ComponentType[] = [
  {
    key: '1',
    label: 'Обзор',
    groupId: '1-1',
  },
  {
    key: '2',
    label: 'Attachment',
    groupId: '1-2',
  },
  {
    key: '3',
    label: 'BasicSelect',
    groupId: '1-2',
    deprecated: true,
    badgeLabel: 'deprecated',
    badgeStatus: 'error',
  },
  {
    key: '4',
    label: 'Button',
    groupId: '1-2',
  },
  {
    key: '5',
    label: 'Calendar',
    groupId: '1-2',
    deprecated: true,
    badgeLabel: 'deprecated',
    badgeStatus: 'error',
  },
  {
    key: '6',
    label: 'CheckBox',
    groupId: '1-2',
  },
  {
    key: '7',
    label: 'CheckBoxGroup',
    groupId: '1-2',
  },
  {
    key: '8',
    label: 'MultiCombobox',
    groupId: '1-2',
    deprecated: true,
    badgeLabel: 'deprecated',
    badgeStatus: 'error',
  },
  {
    key: '9',
    label: 'ProgressStepBar',
    groupId: '1-3',
    badgeLabel: 'canary',
    badgeStatus: 'success',
    badgeView: 'filled',
  },
  {
    key: '10',
    label: 'NewComponent',
    groupId: '1-3',
    badgeLabel: 'в работе',
    badgeStatus: 'warning',
    badgeView: 'filled',
  },
];

export const componentsGroup: DefaultMenuGroup[] = [
  {
    id: '1-1',
    label: 'компоненты',
  },
  {
    id: '1-2',
    label: 'базовые',
  },
  {
    id: '1-3',
    label: 'служебные',
  },
];
