import { createStand } from '##/stand/standConfig';

import image from './Tag.image.svg';

export default createStand({
  title: 'Tag',
  id: 'Tag',
  group: 'components',
  image,
  description: 'Кнопка. Разные формы, цвета и размеры.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=20626%3A5067',
  order: 10,
});
