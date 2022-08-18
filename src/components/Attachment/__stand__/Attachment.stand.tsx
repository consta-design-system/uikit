import { createStand } from '##/stand/standConfig';

import image from './Attachment.image.svg';

export default createStand({
  title: 'Attachment',
  id: 'Attachment',
  group: 'components',
  image,
  description: 'Показывает загрузку файла или уже загруженный файл.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=43155%3A107678',
  order: 10,
});
