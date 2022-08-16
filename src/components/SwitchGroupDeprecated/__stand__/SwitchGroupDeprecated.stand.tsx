import { createStand } from '##/stand/standConfig';

import image from './SwitchGroup.image.svg';

export default createStand({
  title: 'SwitchGroup',
  id: 'SwitchGroupDeprecated',
  group: 'components',
  image,
  description: 'Группа переключателей',
  version: '4.0.0',
  status: 'deprecated',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=20626%3A3378',
  order: 10,
});
