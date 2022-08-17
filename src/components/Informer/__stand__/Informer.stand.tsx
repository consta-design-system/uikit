import { createStand } from '##/stand/standConfig';

import image from './Informer.image.svg';

export default createStand({
  title: 'Informer',
  id: 'Informer',
  group: 'components',
  image,
  description:
    'Сообщение для пользователя. Встраивается в содержимое страницы.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=9601%3A151',
  order: 10,
});
