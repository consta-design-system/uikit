import { createStand } from '##/stand/standConfig';

import image from './Avatar.image.svg';

export default createStand({
  title: 'Avatar',
  id: 'Avatar',
  group: 'components',
  image,
  description: 'Аватар. Разные формы, цвета и размеры.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=20483%3A1962',
  order: 10,
});
