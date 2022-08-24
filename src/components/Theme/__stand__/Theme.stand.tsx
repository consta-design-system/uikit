import { createStand } from '##/stand/standConfig';

import image from './Theme.image.svg';

export default createStand({
  title: 'Theme',
  id: 'Theme',
  group: 'components',
  image,
  description:
    'Тема. Набор правил в CSS, который определяет, как выглядит проект.',
  version: '4.0.0',
  status: 'stable',
  sandbox:
    'https://codesandbox.io/embed/react-new?fontsize=14&hidenavigation=1&theme=dark',
  figma:
    'https://www.figma.com/embed?embed_host=uikit.consta.design&url=https://www.figma.com/file/vNZFtFH6w0IjD2Twi5OXXE/Consta-Default-Colors?node-id=1721%3A6',
  order: 10,
});
