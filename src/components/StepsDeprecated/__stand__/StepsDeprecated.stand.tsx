import { createStand } from '##/stand/standConfig';

import image from './Steps.image.svg';

export default createStand({
  title: 'Steps',
  id: 'StepsDeprecated',
  group: 'components',
  image,
  description: 'Шаги.',
  version: '4.0.0',
  status: 'deprecated',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=20626%3A2941',
  order: 10,
});
