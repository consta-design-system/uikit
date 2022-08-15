import { createStand } from '##/stand/standConfig';

import image from './User.image.svg';

export default createStand({
  title: 'User',
  id: 'User',
  group: 'components',
  image,
  description:
    'Показывает информацию о человеке: аватарку, имя, должность, статус.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=20626%3A10274',
  order: 10,
});
