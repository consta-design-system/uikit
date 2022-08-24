import { createStand } from '##/stand/standConfig';

import image from './Loader.image.svg';

export default createStand({
  title: 'Loader',
  id: 'Loader',
  group: 'components',
  image,
  description: 'Прелоадер. Показывает, что информация загружается.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=2334%3A37476',
  order: 10,
});
