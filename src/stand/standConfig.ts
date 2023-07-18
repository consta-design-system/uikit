import { createConfig, ListCardBig, ListCardList } from '@consta/stand';

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
      renderList: ListCardBig,
    },
    {
      title: 'Миксины',
      id: 'mixs',
      renderList: ListCardList,
    },
    {
      title: 'Hocs',
      id: 'hocs',
      renderList: ListCardList,
    },
    {
      title: 'Hooks',
      id: 'hooks',
      renderList: ListCardList,
    },
  ],
  group: 'Библиотеки',
  image,
  description:
    'Основная библиотека интерфейсных компонентов: от простых контролов до хуков и миксинов',
  standPageDecoration,
  repositoryUrl: 'https://github.com/consta-design-system/uikit',
  figmaUrl: 'https://www.figma.com/community/file/853774806786762374',
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
