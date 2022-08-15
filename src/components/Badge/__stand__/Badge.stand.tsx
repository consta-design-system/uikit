import { createStand } from '##/stand/standConfig';

import image from './Badge.image.svg';

export default createStand({
  title: 'Badge',
  id: 'Badge',
  group: 'components',
  image,
  description: 'Бейджик. Показывает статус процесса.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=40%3A119',
  order: 10,
});
