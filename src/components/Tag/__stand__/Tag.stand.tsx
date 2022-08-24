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
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=11148%3A145952',
  order: 10,
});
