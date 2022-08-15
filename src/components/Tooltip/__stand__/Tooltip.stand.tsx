import { createStand } from '##/stand/standConfig';

import image from './Tooltip.image.svg';

export default createStand({
  title: 'Tooltip',
  id: 'Tooltip',
  group: 'components',
  image,
  description: 'Тултип. Всплывающее окно.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=77648%3A163900',
  order: 10,
});
