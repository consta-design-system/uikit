import { createStand } from '##/stand/standConfig';

import image from './Radio.image.svg';

export default createStand({
  title: 'Radio',
  id: 'Radio',
  group: 'components',
  image,
  description: 'Радиокнопка. Разные формы, цвета и размеры.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=57%3A1655',
  order: 10,
});
