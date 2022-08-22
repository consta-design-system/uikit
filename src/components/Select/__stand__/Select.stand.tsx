import { createStand } from '##/stand/standConfig';

import image from './Select.image.svg';

export default createStand({
  title: 'Select',
  id: 'Select',
  group: 'components',
  image,
  description: 'Выпадающий список. Позволяет выбрать один вариант.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=9701%3A190445',
  order: 10,
});
