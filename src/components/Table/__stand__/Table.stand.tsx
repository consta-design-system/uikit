import { createStand } from '##/stand/standConfig';

import image from './Table.image.svg';

export default createStand({
  title: 'Table',
  id: 'Table',
  group: 'components',
  image,
  description: 'Таблица',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=94374%3A195778',
  order: 10,
});
