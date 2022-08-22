import { createStand } from '##/stand/standConfig';

import image from './Steps.image.svg';

export default createStand({
  title: 'Steps',
  id: 'Steps',
  group: 'components',
  image,
  description: 'Шаги.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=6747%3A130211',
  order: 10,
});
