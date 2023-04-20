import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';
import { StandPageDecoration as standPageDecoration } from './standPageDecoration';

export const { createStand } = createConfig({
  title: 'Consta UI Kit',
  id: 'uikit',
  groups: [
    {
      title: 'Документация',
      id: 'about',
    },
    {
      title: 'Компоненты',
      id: 'components',
      view: 'card',
    },
    {
      title: 'Миксины',
      id: 'mixs',
    },
    {
      title: 'Hocs',
      id: 'hocs',
    },
    {
      title: 'Hooks',
      id: 'hooks',
    },
  ],
  group: 'Библиотеки',
  image,
  description:
    'Основная библиотека интерфейсных компонентов: от простых контролов до хуков и миксинов',
  standPageDecoration,
  repositoryUrl: 'https://github.com/consta-design-system/uikit',
  order: 1,
  standTabs: [
    // табы по умолчанию
    { id: '', label: 'Обзор' },
    { id: 'dev', label: 'Разработчикам' },
    { id: 'design', label: 'Дизайнерам', figma: true },
    { id: 'sandbox', label: 'Песочница', sandbox: true },
    // свои табы
    { id: 'use', label: 'Как использовать' },
  ],
});
