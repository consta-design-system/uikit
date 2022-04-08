import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';

const groups = [
  {
    title: 'Компоненты',
    id: 'components',
  },
  {
    title: 'Миксины',
    id: 'mixs',
  },
] as const;

export const { createStand } = createConfig({
  title: 'Consta uikit',
  id: 'uikit',
  groups,
  group: 'библиотеки компонентов',
  image,
  description:
    '[тут описание что это такое] Ультра топчик библиотеки с пацанскими кнопками и графиками, качай.',
});
