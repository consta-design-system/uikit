import { createConfig } from '@consta/stand';

import image from './ConstaImage.png';
import description from './description.mdx';
import { StandPageDecoration as standPageDecoration } from './standPageDecoration';

const groups = [
  {
    title: 'Компоненты',
    id: 'components',
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
] as const;

export const { createStand } = createConfig({
  title: 'Consta uikit',
  id: 'uikit',
  groups,
  group: 'библиотеки компонентов',
  image,
  description,
  standPageDecoration,
});
