import { createStand } from '##/stand/standConfig';

import image from './Grid.image.svg';

export default createStand({
  title: 'Grid',
  id: 'Grid',
  group: 'components',
  image,
  description:
    'Модульная сетка. Отвечает за расположение содержимого на странице.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=9601%3A151',
  order: 10,
});
