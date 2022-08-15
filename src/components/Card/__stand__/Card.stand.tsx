import { createStand } from '##/stand/standConfig';

import image from './Card.image.svg';

export default createStand({
  title: 'Card',
  id: 'Card',
  group: 'components',
  image,
  description: 'Карточка. Контейнер для любого контента.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=24670%3A0',
  order: 10,
});
